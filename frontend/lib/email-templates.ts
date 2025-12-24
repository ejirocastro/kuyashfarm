/**
 * Email Notification Templates
 * Ready for backend integration with email services (SendGrid, AWS SES, etc.)
 */

import { Order, Product } from "./types";
import { formatPrice } from "./utils";

export interface EmailTemplate {
  to: string;
  subject: string;
  htmlBody: string;
  textBody: string;
}

/**
 * Order Confirmation Email
 */
export function generateOrderConfirmationEmail(
  order: Order,
  customerEmail: string
): EmailTemplate {
  const itemsList = order.items
    .map(
      (item) =>
        `- ${item.name} (${item.quantity}x ${formatPrice(item.price)}) = ${formatPrice(
          item.price * item.quantity
        )}`
    )
    .join("\n");

  return {
    to: customerEmail,
    subject: `Order Confirmation - ${order.orderNumber}`,
    htmlBody: `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #2d5f3f; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Kuyash Integrated Farm</h1>
            <p style="margin: 5px 0 0 0;">Order Confirmation</p>
          </div>

          <div style="border: 1px solid #e0e0e0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
            <h2>Thank you for your order!</h2>
            <p>Your order has been successfully placed and is being processed.</p>

            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p style="margin: 5px 0 0 0;"><strong>Order Date:</strong> ${new Date(
                order.date
              ).toLocaleDateString()}</p>
            </div>

            <h3>Order Items:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${order.items
                .map(
                  (item) => `
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 10px 0;">${item.name} (x${item.quantity})</td>
                  <td style="padding: 10px 0; text-align: right;">${formatPrice(
                    item.price * item.quantity
                  )}</td>
                </tr>
              `
                )
                .join("")}
              <tr>
                <td style="padding: 10px 0;"><strong>Subtotal</strong></td>
                <td style="padding: 10px 0; text-align: right;"><strong>${formatPrice(
                  order.subtotal
                )}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">Shipping</td>
                <td style="padding: 10px 0; text-align: right;">${formatPrice(order.shipping)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">Tax</td>
                <td style="padding: 10px 0; text-align: right;">${formatPrice(order.tax)}</td>
              </tr>
              <tr style="border-top: 2px solid #2d5f3f;">
                <td style="padding: 10px 0;"><strong>Total</strong></td>
                <td style="padding: 10px 0; text-align: right;"><strong>${formatPrice(
                  order.total
                )}</strong></td>
              </tr>
            </table>

            <h3>Shipping Address:</h3>
            <p style="margin: 5px 0;">
              ${order.shippingAddress.name}<br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${
      order.shippingAddress.zipCode
    }<br>
              ${order.shippingAddress.phone || ""}
            </p>

            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #2d5f3f;"><strong>What's Next?</strong></p>
              <p style="margin: 5px 0 0 0;">We'll send you a shipping confirmation email as soon as your order ships.</p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Thank you for choosing Kuyash Integrated Farm</p>
            <p>Farming for a Future</p>
          </div>
        </body>
      </html>
    `,
    textBody: `
Order Confirmation - ${order.orderNumber}

Thank you for your order!

Order Number: ${order.orderNumber}
Order Date: ${new Date(order.date).toLocaleDateString()}

Order Items:
${itemsList}

Subtotal: ${formatPrice(order.subtotal)}
Shipping: ${formatPrice(order.shipping)}
Tax: ${formatPrice(order.tax)}
Total: ${formatPrice(order.total)}

Shipping Address:
${order.shippingAddress.name}
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}

We'll send you a shipping confirmation email as soon as your order ships.

Thank you for choosing Kuyash Integrated Farm
Farming for a Future
    `,
  };
}

/**
 * Low Stock Alert Email (for Admins)
 */
export function generateLowStockAlertEmail(
  product: Product,
  adminEmail: string
): EmailTemplate {
  return {
    to: adminEmail,
    subject: `⚠️ Low Stock Alert: ${product.name}`,
    htmlBody: `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ff9800; color: white; padding: 20px; border-radius: 8px;">
            <h1 style="margin: 0;">⚠️ Low Stock Alert</h1>
          </div>

          <div style="border: 1px solid #e0e0e0; padding: 20px; margin-top: 20px; border-radius: 8px;">
            <p><strong>${product.name}</strong> is running low on stock!</p>

            <table style="width: 100%; margin-top: 20px;">
              <tr>
                <td><strong>Current Stock:</strong></td>
                <td>${product.stock} units</td>
              </tr>
              <tr>
                <td><strong>Low Stock Threshold:</strong></td>
                <td>${product.lowStockThreshold} units</td>
              </tr>
              <tr>
                <td><strong>Suggested Reorder:</strong></td>
                <td>${product.reorderPoint} units</td>
              </tr>
              <tr>
                <td><strong>Category:</strong></td>
                <td>${product.category}</td>
              </tr>
            </table>

            <div style="background-color: #fff3e0; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ff9800;">
              <p style="margin: 0;"><strong>Action Required:</strong></p>
              <p style="margin: 5px 0 0 0;">Please restock this item to avoid running out of inventory.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    textBody: `
LOW STOCK ALERT: ${product.name}

${product.name} is running low on stock!

Current Stock: ${product.stock} units
Low Stock Threshold: ${product.lowStockThreshold} units
Suggested Reorder: ${product.reorderPoint} units
Category: ${product.category}

Action Required: Please restock this item to avoid running out of inventory.
    `,
  };
}

/**
 * Out of Stock Alert Email (for Admins)
 */
export function generateOutOfStockAlertEmail(
  product: Product,
  adminEmail: string
): EmailTemplate {
  return {
    to: adminEmail,
    subject: `🚨 OUT OF STOCK: ${product.name}`,
    htmlBody: `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f44336; color: white; padding: 20px; border-radius: 8px;">
            <h1 style="margin: 0;">🚨 Out of Stock Alert</h1>
          </div>

          <div style="border: 1px solid #e0e0e0; padding: 20px; margin-top: 20px; border-radius: 8px;">
            <p><strong>${product.name}</strong> is now OUT OF STOCK!</p>

            <table style="width: 100%; margin-top: 20px;">
              <tr>
                <td><strong>Product:</strong></td>
                <td>${product.name}</td>
              </tr>
              <tr>
                <td><strong>Category:</strong></td>
                <td>${product.category}</td>
              </tr>
              <tr>
                <td><strong>Suggested Reorder:</strong></td>
                <td>${product.reorderPoint} units</td>
              </tr>
            </table>

            <div style="background-color: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f44336;">
              <p style="margin: 0;"><strong>URGENT ACTION REQUIRED:</strong></p>
              <p style="margin: 5px 0 0 0;">This product is completely out of stock. Customers cannot place orders until inventory is restocked.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    textBody: `
OUT OF STOCK ALERT: ${product.name}

${product.name} is now OUT OF STOCK!

Product: ${product.name}
Category: ${product.category}
Suggested Reorder: ${product.reorderPoint} units

URGENT ACTION REQUIRED: This product is completely out of stock. Customers cannot place orders until inventory is restocked.
    `,
  };
}

/**
 * Restock Notification Email (for Customers)
 */
export function generateRestockNotificationEmail(
  product: Product,
  customerEmail: string
): EmailTemplate {
  return {
    to: customerEmail,
    subject: `✅ ${product.name} is Back in Stock!`,
    htmlBody: `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #4caf50; color: white; padding: 20px; border-radius: 8px;">
            <h1 style="margin: 0;">Good News! 🎉</h1>
            <p style="margin: 5px 0 0 0;">The product you wanted is back in stock!</p>
          </div>

          <div style="border: 1px solid #e0e0e0; padding: 20px; margin-top: 20px; border-radius: 8px;">
            <h2>${product.name}</h2>
            <p>${product.description}</p>

            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-size: 24px; color: #2d5f3f;"><strong>${formatPrice(
                product.price
              )}</strong> ${product.unit}</p>
              <p style="margin: 5px 0 0 0; color: #4caf50;"><strong>✓ ${
                product.stock
              } units in stock</strong></p>
            </div>

            <p style="text-align: center;">
              <a href="https://kuyashfarm.com/shop/${
                product.category
              }" style="display: inline-block; background-color: #2d5f3f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Shop Now
              </a>
            </p>

            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This is a one-time notification. You requested to be notified when this product became available.
            </p>
          </div>
        </body>
      </html>
    `,
    textBody: `
${product.name} is Back in Stock!

The product you wanted is now available!

${product.name}
${formatPrice(product.price)} ${product.unit}

${product.stock} units in stock

Shop now: https://kuyashfarm.com/shop/${product.category}

This is a one-time notification. You requested to be notified when this product became available.
    `,
  };
}

/**
 * Mock email sending function
 * Replace with actual email service in production (SendGrid, AWS SES, etc.)
 */
export function sendEmail(template: EmailTemplate): void {
  // In production, integrate with email service:
  // await sendGrid.send(template);
  // await ses.sendEmail(template);

  // For now, log to console and store in localStorage
  console.log("📧 Email would be sent:", {
    to: template.to,
    subject: template.subject,
  });

  // Store in localStorage for demo purposes
  if (typeof window !== "undefined") {
    const sentEmails = JSON.parse(localStorage.getItem("kuyash_sent_emails") || "[]");
    sentEmails.unshift({
      ...template,
      sentAt: new Date().toISOString(),
    });

    // Keep only last 50 emails
    if (sentEmails.length > 50) {
      sentEmails.splice(50);
    }

    localStorage.setItem("kuyash_sent_emails", JSON.stringify(sentEmails));
  }
}
