# Netlify Deployment Guide

Architect AI projesi, Netlify'ın modern serverless mimarisine (Vite + Netlify Functions) tam uyumlu olarak yapılandırılmıştır. Uygulamayı canlıya almak için iki ana yönteminiz vardır:

## Yöntem 1: Netlify CLI ile Hızlı Dağıtım (Önerilen)

Projeye `netlify-cli` zaten eklenmiştir. Terminalinizde şu adımları izleyebilirsiniz:

1. **Netlify'a Giriş Yapın:**
   ```bash
   npx netlify login
   ```
   (Tarayıcınızda bir pencere açılacak, onay vermeniz yeterlidir.)

2. **Projeyi Başlatın (Link/Create):**
   ```bash
   npx netlify init
   ```
   - "Create & configure a new site" seçeneğini seçin.
   - Build command: `npm run build`
   - Directory to deploy: `dist`
   - Bu adım `netlify.toml` dosyanızı otomatik olarak okuyacaktır.

3. **Canlıya Alın:**
   ```bash
   npx netlify deploy --prod
   ```

## Yöntem 2: GitHub ile Sürekli Entegrasyon (Profesyonel)

Kodunuzu GitHub/GitLab'a yüklediyseniz:

1. [app.netlify.com](https://app.netlify.com) adresine gidin.
2. **"Add new site"** -> **"Import an existing project"** adımlarını izleyin.
3. Reponuzu seçin.
4. Netlify, projedeki `netlify.toml` dosyasını otomatik olarak algılayacaktır:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Functions Directory:** `netlify/functions`
5. **"Deploy Site"** butonuna basın.

## MCP ve API Hakkında Notlar

- **Backend:** `api/transform` isteği otomatik olarak `netlify/functions/transform.js` dosyasına yönlendirilir.
- **Environment Variables:** Eğer gerçek bir MCP sunucu URL'i kullanacaksanız, bunu Netlify Dashboard'unda **Site Settings > Environment Variables** kısmından ekleyebilirsiniz.

Uygulamanız artık `https://site-adi.netlify.app` üzerinden erişilebilir olacaktır!
