import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  try {
    const { name, description, photoUrl, quantityAvailable, contactNumber } = req.body;
    const { tenantId, userId } = req;

    // Verificar si el tenant y el usuario existen
    const tenantExists = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenantExists) {
      return res.status(404).json({ error: 'Tenant no encontrado.' });
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        photoUrl,
        quantityAvailable,
        contactNumber,
        tenantId,
        userId,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, photoUrl, quantityAvailable, contactNumber } = req.body;
    const { tenantId } = req;

    if (!name || !description || quantityAvailable == undefined || !contactNumber) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing || existing.tenantId !== tenantId) {
      return res.status(404).json({ error: 'Producto no encontrado o acceso denegado.' });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        photoUrl,
        quantityAvailable,
        contactNumber,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { tenantId } = req;

    const products = await prisma.product.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' }, // Orden por fecha de creación
      include: {
        tenant: {
          select: {
            id: true,        // Incluimos el ID del tenant
            name: true,      // Nombre del tenant (tienda)
            createdAt: true, // Fecha de creación del tenant (opcional)
          },
        },
        user: {
          select: {
            id: true,        // ID del usuario
            name: true,      // Nombre del vendedor
            phone: true,     // Teléfono del vendedor
          },
        },
      },
    });

    const formattedProducts = products.map(product => ({
      ...product,
      tenantName: product.tenant.name,  // Nombre del tenant directamente en la respuesta
      tenantCreatedAt: product.tenant.createdAt, // Añadir la fecha de creación del tenant (opcional)
      tenant: undefined, // Eliminamos el objeto completo de tenant
    }));

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { tenantId } = req;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    
    if (existing.tenantId !== tenantId) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar este producto.' });
    }

    await prisma.product.delete({ where: { id } });

    res.status(200).json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
