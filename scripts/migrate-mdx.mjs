/**
 * One-shot migration script.
 *
 * Reads every *.mdx file from src/content/, prepends YAML frontmatter derived
 * from topics.json, and writes the result to src/content/topics/.
 *
 * For the 7 hook-demo MDX files that use interactive React components,
 * the script also injects an import statement and appends `client:load`
 * to each component usage so Astro hydrates them client-side.
 *
 * Run once: node scripts/migrate-mdx.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const topicsJson = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src/content/topics.json'), 'utf-8'),
);

const CONTENT_DIR = path.join(ROOT, 'src/content');
const TOPICS_DIR = path.join(CONTENT_DIR, 'topics');

fs.mkdirSync(TOPICS_DIR, { recursive: true });

// slug → topic metadata lookup
const topicMap = Object.fromEntries(topicsJson.map((t) => [t.slug, t]));

/**
 * The 7 MDX files that embed interactive React components via the old
 * MDXProvider/ComponentRegistry pattern. Each entry describes:
 *   - importPath: relative from src/content/topics/<file>.mdx
 *   - componentName: JSX tag name used inside the MDX file
 */
const interactiveComponents = {
    'use-state': {
        importPath: '../../Hooks/UseStateComponent/UseStateComponentExample.jsx',
        componentName: 'UseStateExample',
    },
    'use-effect': {
        importPath: '../../Hooks/UseEffectComponent/UseEffectComponentExample.jsx',
        componentName: 'UseEffectExample',
    },
    'use-context': {
        importPath: '../../Hooks/UseContextComponent/UseContextComponentExample.jsx',
        componentName: 'UseContextExample',
    },
    'use-ref': {
        importPath: '../../Hooks/UseRefComponent/UseRefComponentExample.jsx',
        componentName: 'UseRefExample',
    },
    'use-memo': {
        importPath: '../../Hooks/UseMemoComponent/UseMemoComponentExample.jsx',
        componentName: 'UseMemoExample',
    },
    'use-callback': {
        importPath: '../../Hooks/UseCallbackComponent/UseCallbackComponentExample.jsx',
        componentName: 'UseCallbackExample',
    },
    'use-reducer': {
        importPath: '../../Hooks/UseReducerComponent/UseReducerComponentExample.jsx',
        componentName: 'UseReducerExample',
    },
};

/**
 * Builds a YAML frontmatter block for a topic.
 *
 * @param {object} topic - Entry from topics.json
 * @returns {string} Frontmatter block including surrounding `---` fences
 */
function buildFrontmatter(topic) {
    const lines = ['---'];
    // Escape double-quotes inside the value; backticks are safe unescaped in YAML double-quoted strings.
    lines.push(`title: "${topic.title.replace(/"/g, '\\"')}"`);
    lines.push(`category: "${topic.category}"`);
    if (topic.subcategory) {
        lines.push(`subcategory: "${topic.subcategory}"`);
    }
    lines.push(`order: ${topic.id}`);
    lines.push('---');
    return lines.join('\n');
}

const mdxFiles = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'));

let processed = 0;

for (const file of mdxFiles) {
    const slug = file.replace('.mdx', '');
    const srcPath = path.join(CONTENT_DIR, file);
    const destPath = path.join(TOPICS_DIR, file);

    let content = fs.readFileSync(srcPath, 'utf-8');

    // Build frontmatter block
    const topic = topicMap[slug];
    let frontmatter;
    if (topic) {
        frontmatter = buildFrontmatter(topic);
    } else {
        const title = slug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        frontmatter = `---\ntitle: "${title}"\ncategory: "uncategorized"\norder: 999\n---`;
        console.warn(`  WARNING: "${slug}" not found in topics.json — using fallback frontmatter`);
    }

    // Handle the 7 interactive component files
    let importSection = '';
    const interactive = interactiveComponents[slug];
    if (interactive) {
        importSection = `\nimport ${interactive.componentName} from '${interactive.importPath}';\n`;
        // Replace bare JSX tag with client:load variant
        content = content.replace(
            new RegExp(`<${interactive.componentName}\\s*/>`, 'g'),
            `<${interactive.componentName} client:load />`,
        );
    }

    const newContent = frontmatter + '\n' + importSection + '\n' + content;
    fs.writeFileSync(destPath, newContent, 'utf-8');
    console.log(`  ✓ ${slug}`);
    processed++;
}

console.log(`\nDone. ${processed} files written to src/content/topics/`);
