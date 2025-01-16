import type { Rates } from "@/types/properties.types";

/**
 * Returns a formatted string representing the rate based on the provided rates object.
 * 
 * @param {Rates} rates - An object containing the rates for different time periods.
 * @param {number} rates.monthly - The monthly rate.
 * @param {number} rates.weekly - The weekly rate.
 * @param {number} rates.nightly - The nightly rate.
 * 
 * @returns {string} A formatted string representing the rate, prefixed with '£' and suffixed with the appropriate time period (e.g., '/mo', '/wk', '/night').
 */
export const getRateDisplay = (rates: Rates) => {
  if (rates.monthly) {
    return `£${rates.monthly.toLocaleString()}/mo`;
  } else if (rates.weekly) {
    return `£${rates.weekly.toLocaleString()}/wk`;
  } else if (rates.nightly) {
    return `£${rates.nightly.toLocaleString()}/night`;
  }
};
