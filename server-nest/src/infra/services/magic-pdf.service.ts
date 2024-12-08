import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class MagicPdfService {
  async processBills(bills: Express.Multer.File[]) {
    const form = new FormData();

    bills.forEach((bill, index) => {
      form.append(
        'file',
        bill.buffer,
        bill.originalname || `bill_${index + 1}.pdf`,
      );
    });

    const response = await axios.post(
      'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
      form,
      {
        headers: form.getHeaders(),
      },
    );

    return response.data;
  }
}
