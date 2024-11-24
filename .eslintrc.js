module.exports = {
    extends: 'next/core-web-vitals',
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // 사용되지 않는 변수 경고 비활성화
      'next/next/no-img-element': 'off', // <img> 태그 경고 비활성화
    },
  };