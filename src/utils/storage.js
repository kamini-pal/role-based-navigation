/**
 * storage.js — shared localStorage utilities for order persistence.
 *
 * Both Order.jsx (read + write) and Dashboard.jsx (read-only) import
 * from here, so the key and fallback logic are defined exactly once.
 */

import mockOrders from '../data/mockOrders'

export const ORDERS_STORAGE_KEY = 'roleBasedNavigation_orders'

/**
 * Read the saved orders from localStorage.
 * Falls back to mockOrders if the key is absent or the JSON is corrupt.
 * @returns {Array} order array
 */
export function loadOrders() {
    try {
        const saved = localStorage.getItem(ORDERS_STORAGE_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
    } catch {
        // Corrupted data — silently fall back to seed data
    }
    return mockOrders
}

/**
 * Persist the orders array to localStorage.
 * @param {Array} orders
 */
export function saveOrders(orders) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}
