const uuid = require('uuid');
const { Op } = require('sequelize');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, rating, ratingSum, votes, brandId, typeId, info } =
        req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const device = await Device.create({
        name,
        price,
        rating,
        votes,
        ratingSum,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.json(device);
  }

  async search(req, res, next) {
    const { name, limit, page } = req.query;
    if (!name) {
      return next(ApiError.badRequest('Search query is empty'));
    }
    let offset = page * limit - limit;
    const devices = await Device.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: '%' + name + '%',
        },
      },
      limit,
      offset,
    });
    return res.json(devices);
  }

  async delete(req, res) {
    const { id } = req.params;
    const device = await Device.destroy({ where: { id } });
    return res.json(device);
  }

  async updateRating(req, res, next) {
    const { id } = req.params;
    const { rating, votes, ratingSum } = req.body;
    try {
      const device = await Device.findOne({ where: { id } });
      if (!device) {
        return next(ApiError.notFound(`Device with id ${id} not found`));
      }
      await device.update({ rating, votes, ratingSum });
      return res.json(device);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DeviceController();
