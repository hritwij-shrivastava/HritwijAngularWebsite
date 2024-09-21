# README: Setting Up Nginx, SSL, and Node.js for Hritwij

This README provides instructions for setting up Nginx as a web server, securing it with SSL certificates, and configuring Node.js for serving applications using `forever`.

## Step 1: Install Nginx

1. **Update the package list:**
   ```bash
   sudo apt update
   ```

2. **Install Nginx:**
   ```bash
   sudo apt install nginx
   y
   ```

3. **Configure the firewall to allow Nginx traffic:**
   ```bash
   sudo ufw app list
   sudo ufw allow 'Nginx FULL'
   sudo ufw status
   ```

4. **In case the firewall is inactive, enable it:**
   ```bash
   sudo ufw enable
   ```

5. **Check firewall status with verbose output to ensure all necessary ports (including SSH) are enabled:**
   ```bash
   sudo ufw status verbose
   ```

6. **Allow specific ports:**
   ```bash
   sudo ufw allow ssh
   sudo ufw allow 22/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 9000/tcp
   ```

7. **Reload Nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

## Step 2: Configure Nginx for Hritwij

1. **Edit the Nginx default site configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. **Update the server block:**
   ```nginx
   server {
       server_name hritwij.com www.hritwij.com hritwij.in www.hritwij.in; # Add domains

       location / {
           # Comment out the line below:
           # try_files $uri $uri/ =404;
           # Add the following line:
           proxy_pass http://localhost:9000;
       }
   }
   ```

3. **Test the Nginx configuration:**
   ```bash
   sudo nginx -t
   ```

4. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

## Step 3: Install and Configure SSL Certificates

1. **Install Certbot and setup the symbolic link:**
   ```bash
   sudo snap install --classic certbot
   sudo ln -s /snap/bin/certbot /usr/bin/certbot
   ```

2. **Obtain SSL certificates for Cetosoft:**
   ```bash
   sudo certbot --nginx -d hritwij.com -d www.hritwij.com -d hritwij.in -d www.hritwij.in
   ```

3. **Test certificate renewal process:**
   ```bash
   sudo certbot renew --dry-run
   ```

## Step 4: Install Node.js and Forever

1. **Update package information and install Node.js:**
   ```bash
   sudo apt update
   sudo apt policy nodejs
   ```

2. **Set up Node.js LTS version and install:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install nodejs
   ```

3. **Verify the Node.js installation:**
   ```bash
   node -v
   ```

4. **Install `forever` globally:**
   ```bash
   sudo npm install -g forever
   ```

## Step 5: Start Node.js Applications with Forever

1. **Start the Hritwij application:**
   ```bash
   forever start hritwij/dist/frontend/server/server.mjs
   ```

## Useful Forever Commands

- **List running forever processes:**
  ```bash
  forever list
  ```

- **Stop the Cetosoft application:**
  ```bash
  forever stop hritwij/dist/frontend/server/server.mjs
  ```
