class AppError extends Error {
  constructor(status, code, message, type = 'server_error') {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.type = type;
  }
}

// 报错脱敏：吃掉所有详细错误信息，客户端只看到状态码
function openAiError(res, error) {
  const status = error.status || 500;

  // 完整错误只打日志，自己排查用
  console.error(`[报错脱敏] ${status} ${error.code || ''} ${error.message || ''}`);

  return res.status(status).json({
    error: {
      message: `${status}`,
      type: 'upstream_error',
      code: status,
    },
  });
}

// 报错脱敏：Anthropic 格式同样只返回状态码
function anthropicError(res, error) {
  const status = error.status || 500;

  console.error(`[报错脱敏] ${status} ${error.code || ''} ${error.message || ''}`);

  return res.status(status).json({
    type: 'error',
    error: {
      type: 'upstream_error',
      message: `${status}`,
    },
  });
}

module.exports = {
  AppError,
  anthropicError,
  openAiError,
};
