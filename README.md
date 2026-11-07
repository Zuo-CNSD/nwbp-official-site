# NWBP 官网

NWBP 桌面音乐播放器的静态官网。网页文件位于 [`dist/`](dist/)；无需安装依赖或执行构建。

## 部署到 Cloudflare Pages

在 Cloudflare Pages 中连接这个 GitHub 仓库，使用以下设置：

| 设置 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 框架预设 | `None` |
| 构建命令 | 留空 |
| 构建输出目录 | `dist` |
| 根目录 | `/` |

首次部署完成后，Cloudflare 会分配 `*.pages.dev` 地址。后续推送到 `main` 会自动更新网站。

## 本地预览

```sh
python3 -m http.server 8000 --directory dist
```

打开 <http://localhost:8000>。

## 软件项目

应用源码、安装包和问题反馈见 [Zuo-CNSD/NWBP](https://github.com/Zuo-CNSD/NWBP)。本仓库使用 GPL-3.0 许可证，详见 [LICENSE](LICENSE)。
