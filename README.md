# 🏔️ Annapurna Kitchen

A stunning, high-performance, mobile-first landing page for a Nepali restaurant, built with React 18 and Vite. 

Designed to evoke the warmth and authenticity of Himalayan culture, featuring a dark/moody aesthetic with deep crimsons, saffron oranges, and turmeric gold accents, complemented by smooth glassmorphism UI elements and Framer Motion animations.

![Annapurna Kitchen](src/assets/images/hero_bg.jpg)

## ✨ Features
*   **Immersive Hero Section:** Parallax background with floating particles.
*   **Animated Trust Strip:** Auto-counting statistics for social proof.
*   **Interactive Menu:** Categorized, tab-filtered menu showcasing authentic dishes with spice and dietary indicators.
*   **Masonry Photo Gallery:** Beautiful, irregular grid layout for food and ambiance photography.
*   **Testimonial Carousel:** Auto-playing, touch-friendly review slider.
*   **Functional Reservation Form:** Client-side validated booking form with success states.
*   **Fully Responsive:** Flawless experience from mobile to ultra-wide desktops.

## 🛠️ Tech Stack
*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** Vanilla CSS (CSS Variables, CSS Grid/Flexbox)
*   **Animations:** Framer Motion
*   **Icons:** Lucide React

---

## 💻 Local Development Setup

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <your-repo-url>
    cd Restaurant_Landing_Page
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173`.

---

## 🚀 AWS EC2 Deployment Guide (Nginx)

This guide walks you through deploying the production build of Annapurna Kitchen to an AWS EC2 instance using Nginx.

### Prerequisites
*   An AWS account with an active EC2 instance running Ubuntu 22.04 or 24.04.
*   Your EC2 instance's `.pem` key file (e.g., `my-key.pem`).
*   The public IP address of your EC2 instance (e.g., `192.168.1.100`).
*   In your AWS Security Group, ensure inbound rules allow **HTTP (port 80)** and **SSH (port 22)** traffic.

### Step 1: Build the App Locally
First, generate the optimized production files. Open your terminal in the project directory and run:

```bash
npm run build
```
This creates a `dist` folder containing your minified HTML, CSS, JS, and optimized images.

### Step 2: Prepare the EC2 Instance
Connect to your EC2 instance via SSH:

```bash
ssh -i /path/to/my-key.pem ubuntu@<your-ec2-ip>
```

Update packages and install Nginx:

```bash
sudo apt update
sudo apt install nginx -y
```

Ensure Nginx is running and enabled on boot:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

Create a directory for your website (we'll use `/var/www/annapurna`):

```bash
sudo mkdir -p /var/www/annapurna
sudo chown -R ubuntu:ubuntu /var/www/annapurna
```

*Type `exit` to disconnect from the EC2 instance.*

### Step 3: Transfer Files to EC2
From your local machine, use `scp` to copy the contents of your `dist` folder to the directory you just created on the EC2 instance.

```bash
# Ensure you are in the project root directory locally
scp -i /path/to/my-key.pem -r dist/* ubuntu@<your-ec2-ip>:/var/www/annapurna/
```

### Step 4: Configure Nginx
Reconnect to your EC2 instance:

```bash
ssh -i /path/to/my-key.pem ubuntu@<your-ec2-ip>
```

Create a new Nginx server block configuration file:

```bash
sudo nano /etc/nginx/sites-available/annapurna
```

Paste the following configuration into the file (replace `your_domain_or_ip` if you have a domain, otherwise leave as `_` to catch all):

```nginx
server {
    listen 80;
    server_name _; # Or your specific domain name e.g., annapurnakitchen.com

    root /var/www/annapurna;
    index index.html;

    # Gzip compression for faster loading
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        # Since this is an SPA, redirect all requests to index.html
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets (images, css, js) for 1 year
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```
*Save and exit (in Nano: `Ctrl+O`, `Enter`, `Ctrl+X`).*

Enable the new site by creating a symbolic link to the `sites-enabled` directory:

```bash
sudo ln -s /etc/nginx/sites-available/annapurna /etc/nginx/sites-enabled/
```

Remove the default Nginx configuration to avoid conflicts:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### Step 5: Test and Restart Nginx
Test your configuration to ensure there are no syntax errors:

```bash
sudo nginx -t
```
*You should see: `nginx: configuration file /etc/nginx/nginx.conf syntax is ok`*

Restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

### 🎉 You're Live!
Open your browser and navigate to your EC2 instance's public IP address. Annapurna Kitchen should now be live!
