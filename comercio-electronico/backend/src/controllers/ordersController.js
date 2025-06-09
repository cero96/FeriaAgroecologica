import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  const { tenantId, userId } = req;
  const { customerId, items } = req.body;

  try {
    // Calcular total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || product.quantityAvailable < item.quantity) {
        return res.status(400).json({ error: 'Producto no disponible o cantidad insuficiente' });
      }

      totalAmount += item.quantity * item.unitPrice;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      });

      // Reducir stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { quantityAvailable: { decrement: item.quantity } },
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        tenantId,
        customerId,
        status: 'pending',
        totalAmount,
        items: {
          create: orderItems
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({ error: 'Error al procesar la orden' });
  }
};

export const getOrdersByCustomer = async (req, res) => {
  const { tenantId } = req;
  const { customerId } = req.query;

  try {
    const orders = await prisma.order.findMany({
      where: { tenantId, customerId },
      include: { items: true }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};
