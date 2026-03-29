// Paystack configuration for client-side use

export const PAYSTACK_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_live_c148a62e428a722fd6a4f77ab3aa4b5c412af4d1',
  plans: {
    pro: {
      id: '2459104',
      name: 'Pro',
      price: 10,
      priceGHS: 109.70,
      currency: 'USD',
    },
    premium: {
      id: '2459105',
      name: 'Premium',
      price: 30,
      priceGHS: 329.10,
      currency: 'USD',
    },
  },
};

// Paystack plan purchase URLs
export const PAYSTACK_PLAN_URLS = {
  pro: 'https://paystack.com/buy/ytubeview-pro-gxtcqd',
  premium: 'https://paystack.com/buy/ytubeview-premium-plan-ftsqet',
};
