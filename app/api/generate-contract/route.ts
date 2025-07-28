import { NextRequest, NextResponse } from 'next/server';
import { generateContract, ContractGenerationData } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data: ContractGenerationData = await request.json();
    
    // Validate required fields
    if (!data.transactionType || !data.amount || !data.currency || !data.buyer || !data.seller) {
      return NextResponse.json(
        { error: '缺少必要的合同信息' },
        { status: 400 }
      );
    }

    // Generate contract using DeepSeek API
    const contractContent = await generateContract(data);
    
    return NextResponse.json({
      success: true,
      contract: contractContent,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Contract generation error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'AI合同生成服务出现错误',
        success: false 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Contract generation API endpoint',
    status: 'active'
  });
}