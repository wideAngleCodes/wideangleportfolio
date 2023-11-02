import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
 
import mdx from "@astrojs/mdx";
import m2dx from "astro-m2dx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypeExternalLinks from "rehype-external-links";
import fauxRemarkEmbedder from "@remark-embedder/core";
import fauxOembedTransformer from "@remark-embedder/transformer-oembed";
const remarkEmbedder = fauxRemarkEmbedder.default;
const oembedTransformer = fauxOembedTransformer.default;
import vue from "@astrojs/vue";
/** @type {import('astro-m2dx').Options} */
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";
const m2dxOptions = {
  exportComponents: true,
  unwrapImages: true,
  autoImports: true,
};

// https://astro.build/config
export default defineConfig({
  site: "https://wideangleportfolio.netlify.app",
  integrations: [
    mdx({}),
    sitemap(),
    tailwind(),
    vue({
      appEntrypoint: "/src/pages/_app",
    }),
    astroImageTools,
    prefetch(),
    compress({
      CSS: true,
      HTML: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: false,
        collapseWhitespace: true,
        conservativeCollapse: false,
        continueOnParseError: false,
        customAttrAssign: [],
        customAttrCollapse: "",
        customAttrSurround: [],
        customEventAttributes: [/^on[a-z]{3,}$/],
        decodeEntities: false,
        html5: true,
        ignoreCustomComments: [],
        ignoreCustomFragments: [],
        includeAutoGeneratedTags: true,
        keepClosingSlash: true,
        maxLineLength: null,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: false,
        preserveLineBreaks: false,
        preventAttributesEscaping: false,
        processConditionalComments: true,
        processScripts: ["module"],
        quoteCharacter: "",
        removeAttributeQuotes: true,
        removeComments: false,
        removeEmptyAttributes: false,
        removeEmptyElements: false,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        trimCustomFragments: false,
        useShortDoctype: false,
      },
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
    
  ],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      [
        remarkEmbedder,
        {
          transformers: [oembedTransformer],
        },
      ],
      [m2dx, m2dxOptions],
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
          target: ["_blank"],
        },
      ],
    ],
  },
  vite: {
    build: {
      rollupOptions: {
        external: [
          "/_pagefind/pagefind.js",
          "/_pagefind/pagefind-ui.js",
          "/_pagefind/pagefind-ui.css",
        ],
      },
      assetsInlineLimit: 10096,
    },
  },
  build: {
    inlineStylesheets: "always",
  },
  scopedStyleStrategy: "attribute",
});
