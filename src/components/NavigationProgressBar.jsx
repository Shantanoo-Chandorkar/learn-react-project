import React from 'react';
import ProgressBar from './ProgressBar';
import useNavigationLoading from '../Hooks/useNavigationLoading';

/**
 * Thin top progress bar that sweeps in while an internal link navigation is in flight.
 *
 * @returns {JSX.Element} The navigation-loading progress bar.
 */
const NavigationProgressBar = () => {
  const isLoading = useNavigationLoading();
  return <ProgressBar mode="loading" isLoading={isLoading} color="var(--primary-color)" height={2} />;
};

export default NavigationProgressBar;
