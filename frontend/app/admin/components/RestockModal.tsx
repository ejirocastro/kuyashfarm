"use client";

import type { Product } from "@/lib/types";

interface RestockModalProps {
  product: Product;
  quantity: string;
  notes: string;
  onQuantityChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RestockModal({
  product,
  quantity,
  notes,
  onQuantityChange,
  onNotesChange,
  onConfirm,
  onCancel,
}: RestockModalProps) {
  const parsed = parseInt(quantity);
  const isValid = !isNaN(parsed) && parsed > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Restock Product</h3>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Product</p>
          <p className="text-base font-semibold text-gray-900">{product.name}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Current Stock</p>
          <p className="text-base font-semibold text-gray-900">{product.stock} units</p>
        </div>

        <div className="mb-4">
          <label htmlFor="restockQuantity" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity to Add *
          </label>
          <input
            id="restockQuantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {isValid && (
            <p className="mt-2 text-sm text-green-600">
              New stock will be: <strong>{product.stock + parsed} units</strong>
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="restockNotes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            id="restockNotes"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add any notes about this restock..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isValid}
            className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Confirm Restock
          </button>
        </div>
      </div>
    </div>
  );
}
