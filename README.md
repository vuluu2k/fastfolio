# Fastfolio

Một dự án Next.js với xác thực đa nền tảng (Google, GitHub) và cơ sở dữ liệu PostgreSQL.

## 🚀 Công nghệ chính

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Xác thực**: [NextAuth.js](https://next-auth.js.org/) với Prisma Adapter
- **Cơ sở dữ liệu**: [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/)
- **Ngôn ngữ**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 🛠️ Cài đặt

1. **Clone dự án**
   ```bash
   git clone https://github.com/your-username/fastfolio.git
   cd fastfolio
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   # hoặc
   yarn
   # hoặc
   pnpm install
   ```

3. **Cấu hình biến môi trường**
   Tạo file `.env.local` từ `.env.example` và điền các giá trị cần thiết:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   
   # NextAuth
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   
   # OAuth Providers
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-id
   GITHUB_SECRET=your-github-secret
   ```

4. **Khởi tạo cơ sở dữ liệu**
   ```bash
   # Tạo và áp dụng migration
   npx prisma migrate dev --name init
   
   # Hoặc nếu chỉ cần đồng bộ schema (không tạo migration)
   npx prisma db push
   ```

5. **Chạy ứng dụng**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 🗄️ Cấu trúc thư mục

```
fastfolio/
├── prisma/
│   └── schema.prisma     # Định nghĩa database schema
├── src/
│   ├── app/              # Next.js App Router
│   ├── auth.config.ts    # Cấu hình NextAuth
│   ├── lib/              # Thư viện tiện ích
│   └── styles/           # Global styles
├── public/               # Static files
└── package.json          # Dependencies & scripts
```

## 🔄 Scripts hữu ích

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Chạy chế độ phát triển |
| `npm run build` | Build cho production |
| `npm start` | Chạy production build |
| `npm run lint` | Kiểm tra lỗi code |
| `npm run format` | Định dạng code tự động |
| `npx prisma studio` | Mở giao diện quản lý database |
| `npx prisma migrate dev` | Tạo và áp dụng migration mới |
| `npx prisma generate` | Tạo lại Prisma Client |

## 🔒 Xác thực

Dự án hỗ trợ đăng nhập bằng:
- Google OAuth
- GitHub OAuth

### Cấu hình OAuth

1. **Google**
   - Tạo dự án tại [Google Cloud Console](https://console.cloud.google.com/)
   - Thêm "Authorized redirect URIs": `http://localhost:3000/api/auth/callback/google`

2. **GitHub**
   - Tạo OAuth App tại [GitHub Developer Settings](https://github.com/settings/developers)
   - Thêm "Authorization callback URL": `http://localhost:3000/api/auth/callback/github`

## 📦 Triển khai

### Vercel (Khuyến nghị)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Ffastfolio)

1. Fork repository này
2. Tạo dự án mới trên Vercel và import từ GitHub
3. Thêm các biến môi trường cần thiết
4. Deploy!

### Self-hosted

1. Build ứng dụng:
   ```bash
   npm run build
   ```

2. Chạy production server:
   ```bash
   npm start
   ```

## 📝 Giấy phép

MIT

---

👤 **Tác giả**: [Your Name]
