import { Request, Response } from 'express';
import { biCycleProductService } from '../biCycle_product/biCycle-product.service';
import BiCycle from './biCycle-product.model';

const createBiCycle = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await biCycleProductService.createBiCycleProduct(data);
    res.json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went to wrong',
      error: err,
    });
  }
};

const getBiCycle = async (req: Request, res: Response) => {
  try {
    const result = await biCycleProductService.getBiCycle();

    res.send({
      status: true,
      message: 'Bicycles retrieved successfully',
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
      status: true,
      message: 'Bicycle retrieved successfully',
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
      status: true,
      message: 'Bicycle updated successfully',
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
      status: true,
      message: 'Bicycle deleted successfully',
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
    res.status(200).json({ data: result });
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
