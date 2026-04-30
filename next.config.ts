const nextConfig = {
  typescript: {
    // AWAS: Ini bakal abaikan error type checking saat build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ini bakal abaikan error linting saat build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
