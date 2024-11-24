import { Request, Response } from 'express';
import { biCycleProductService } from '../biCycle_product/biCycle-product.service';
import BiCycle from './biCycle-product.model';

const createBiCycle = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await biCycleProductService.createBiCycleProduct(data);
    res.json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went to wrong',
      error: error,
    });
  }
};

const getBiCycle = async (req: Request, res: Response) => {
  try {
    const result = await biCycleProductService.getBiCycle();

    res.send({
      message: 'Bicycles retrieved successfully',
      status: true,
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const getSingleBiCycle = async (req: Request, res: Response) => {
  try {
    const biCycleId = req.params.productId;
    const result = await biCycleProductService.getSingleBiCycle(biCycleId);
    res.send({
      message: 'Bicycle retrieved successfully',
      status: true,
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went to wrong',
      error,
    });
  }
};

const updateBiCycle = async (req: Request, res: Response) => {
  try {
    const biCycleId = req.params.productId;
    const body = req.body;
    const result = await biCycleProductService.updateBiCycle(biCycleId, body);
    res.send({
      message: 'Bicycle updated successfully',
      status: true,
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went to wrong',
      error,
    });
  }
};

const deleteBiCycle = async (req: Request, res: Response) => {
  try {
    const biCycleId = req.params.productId;
    await biCycleProductService.deleteBiCycle(biCycleId);

    res.send({
      message: 'Bicycle deleted successfully',
      status: true,
      result: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

const queryBiCycleProduct = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    console.log(query);
    const result = await BiCycle.find(query);
    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const cycleController = {
  createBiCycle,
  getBiCycle,
  getSingleBiCycle,
  updateBiCycle,
  deleteBiCycle,
  queryBiCycleProduct,
};
