# Cloud Integration Gateway

A lightweight, high-performance edge service designed for seamless API request management and header sanitization. Built to run on Edge Runtime for minimal latency and global scalability.

## 🚀 Features

- **Edge Computing**: Leverages Vercel Edge Runtime for faster response times.
- **Security Focused**: Automatically strips sensitive proxy headers to ensure clean upstream communication.
- **Dynamic Routing**: Configurable environment variables for flexible backend integration.
- **Auto-Healing**: Built-in error handling for 502/504 gateway timeouts.

## 🛠 Configuration

To deploy this service, you need to set up the following environment variable in your Vercel dashboard:

| Variable | Description |
| :--- | :--- |
| `GATEWAY_URL` | The target destination URL where requests will be routed. |

## 📦 Deployment

1. Click the **Deploy** button on Vercel.
2. Link your GitHub repository.
3. Define the `GATEWAY_URL` in the Environment Variables section.
4. Deploy and enjoy global edge connectivity.

## 📄 License

MIT License - feel free to use this for your personal development projects.
