# Portfolio

Trang portfolio một trang cho freelance full-stack. Nội dung hiển thị bằng tiếng Anh. Giao diện mặc định là nền tối, và theo `prefers-color-scheme` cho đến khi bạn bấm nút đổi theme.

## Sửa nội dung / Edit the copy

Toàn bộ chữ trên trang nằm trong `src/data/en/`. Component không chứa câu chữ.

| File | Nội dung |
|---|---|
| `src/data/en/profile.ts` | Tên, tagline, múi giờ, email, Upwork, GitHub, LinkedIn, CV |
| `src/data/en/index.ts` | About, quy trình, nhãn nút, và `siteUrl` |
| `src/data/en/skills.ts` | Nhóm công nghệ |
| `src/data/en/experience.ts` | Timeline |
| `src/data/en/projects.ts` | Case study |

Ảnh dự án đặt trong `public/projects/`. Mỗi dự án trỏ tới file đó qua `image.src`.

Tiếng Anh là bản mặc định, route `/`. Để thêm tiếng Nhật sau này:

1. Thêm `"ja"` vào `locales` trong `src/data/types.ts`.
2. Tạo `src/data/ja/` với cùng kiểu `SiteContent`.
3. Gắn dictionary đó trong `src/data/index.ts`.
4. Thêm `src/app/ja/page.tsx` (và route project tương ứng) gọi `getContent("ja")`.

Chưa có bản tiếng Nhật.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

```bash
npm run lint
npm run build
```

`npm run build` xuất site tĩnh vào thư mục `out/` (`output: 'export'`). Ảnh dùng `next/image` với `images.unoptimized`, vì static export không có server tối ưu ảnh.

## Hiệu ứng đang dùng

Không có thư viện chuyển động. Cả sáu hiệu ứng tôn trọng `prefers-reduced-motion`.

1. Menu cột trái có gạch mục đang xem (IntersectionObserver).
2. Hàng kinh nghiệm và project đổi nền khi hover.
3. Badge “Available for freelance” với chấm nhịp chậm.
4. Dòng hero đổi ba cụm, rồi dừng ở câu tagline đầy đủ.
5. Ảnh dự án trong khung UI, hover nhích lên bằng `transform`.
6. Lưới nền CSS đứng yên.

Scene 3D chưa làm.

## Deploy lên Vercel

1. Đẩy repo lên GitHub.
2. Vào [vercel.com/new](https://vercel.com/new) và import repo.
3. Framework là Next.js. Không cần đổi build command.
4. Trước khi public, sửa `siteUrl` trong `src/data/en/index.ts` thành domain thật.

Vercel chạy được cả static export. Nếu nền tảng hỏi output, thư mục là `out`.

## Deploy lên Azure Static Web Apps

Workflow: `.github/workflows/azure-static-web-apps.yml`.

1. Tạo Static Web App trên Azure, chọn plan Free nếu đủ.
2. Lấy deployment token.
3. Thêm secret `AZURE_STATIC_WEB_APPS_API_TOKEN` trong GitHub repo (Settings → Secrets and variables → Actions).
4. Đẩy lên nhánh `main`. Workflow cài dependency, chạy `npm run build`, rồi upload thư mục `out`.

Chưa có secret thì bước deploy được bỏ qua (`skip_deploy_on_missing_secrets`) và job vẫn xanh. Build vẫn chạy.

`public/staticwebapp.config.json` được copy vào bản build để 404 trả về `404.html`.

## Docker

Nginx phục vụ đúng thư mục `out`:

```bash
docker build -t portfolio .
docker run --rm -p 8080:80 portfolio
```

Mở http://localhost:8080.

## Việc còn để `[[TODO]]`

- `src/data/en/index.ts`: `siteUrl` (đang là `https://example.com`)
- Ảnh UI của dự án riêng tư — cố ý không đăng. Thay bằng sơ đồ luồng (React Flow) trong case study

CV nằm ở `public/Nguyen_A_Chau_CV.pdf`. Không bịa tên khách hay số liệu.
