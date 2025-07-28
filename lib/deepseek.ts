import OpenAI from "openai";

// DeepSeek API configuration using OpenAI-compatible client
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export interface ContractGenerationData {
  transactionType: string;
  amount: string;
  currency: string;
  buyer: string;
  seller: string;
  description?: string;
  additionalTerms?: string;
}

export async function generateContract(data: ContractGenerationData): Promise<string> {
  try {
    const prompt = `请为以下担保交易生成一份专业的合同模板：

交易类型：${data.transactionType}
交易金额：${data.amount} ${data.currency}
买方：${data.buyer}
卖方：${data.seller}
${data.description ? `交易说明：${data.description}` : ''}
${data.additionalTerms ? `附加条款：${data.additionalTerms}` : ''}

请生成一份完整的担保交易合同，包含：
1. 合同标题和编号
2. 双方基本信息
3. 交易标的和金额
4. 担保条款
5. 付款方式和时间
6. 交付条件
7. 违约责任
8. 争议解决条款
9. 合同生效条件

请使用正式的法律文书格式，确保条款清晰明确。`;

    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "你是一个专业的法律合同起草助手，专门负责为加密货币担保交易生成合同模板。请确保合同条款完整、合规且具有法律效力。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content || "合同生成失败，请重试。";
  } catch (error) {
    console.error("DeepSeek API error:", error);
    throw new Error("AI合同生成服务暂时不可用，请稍后重试。");
  }
}

export async function analyzeTransaction(description: string): Promise<{
  risk_level: string;
  suggestions: string[];
  contract_points: string[];
}> {
  try {
    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "你是一个专业的交易风险分析师，请分析交易内容并提供风险评估和合同建议。请以JSON格式返回结果。"
        },
        {
          role: "user",
          content: `请分析以下交易描述的风险等级并提供建议：

${description}

请返回JSON格式：
{
  "risk_level": "低风险/中风险/高风险",
  "suggestions": ["建议1", "建议2", "建议3"],
  "contract_points": ["合同要点1", "合同要点2", "合同要点3"]
}`
        }
      ],
      temperature: 0.5,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      risk_level: result.risk_level || "中风险",
      suggestions: result.suggestions || [],
      contract_points: result.contract_points || []
    };
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return {
      risk_level: "中风险",
      suggestions: ["建议进行详细的交易条款确认"],
      contract_points: ["明确双方责任和义务"]
    };
  }
}