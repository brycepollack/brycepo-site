---
title: 'What is a Website?'
pubDate: '2025-06-07'
draft: false
slug: 'what-is-a-website'
---

Modern web development is hidden under so many layers of abstraction that I often find it difficult to reason about how the code I write turns into a web page in my browser.

When you open up your browser and type `google.com` in the address bar, it results in a fully-functioning web page with interactive content. How does this happen? I'll be hand-waving how the actual infrastructure of the internet works for this article: if you're interested in that, [read this article by Cloudflare](https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/).

# What is a website?

At a high level, loading a website looks like this:

1. The URL is resolved to an IP address.
2. A TCP connection is established between your computer (the client) and the one at that IP address (the server)
3. A request is sent to the server.
4. The server processes the request and sends a response.
5. The browser processes the response and renders a webpage.

URL resolution is handled via DNS, which is essentially just a mapping of domain name to IP address. The browser/OS handles this for the user, so from a developer's perspective all you need to do is configure a DNS record with a domain registrar/DNS provider to tell the global DNS system which IP address a domain name should resolve to.

Before any data can be sent, the client and server must establish a TCP connection. This is handled by the OS, and is essentially a way to say two computers are securely connected.

Requests and response messages are then sent via HTTP (Hyper Text Transfer Protocol), which is the primary method of data transfer on the web. An HTTP message has the following format:

- Start-line: Describes the HTTP version along with the request method for requests or the status code for responses.
- Headers: Key–value metadata that describes the message.
- Body: Actual data being transferred in the form of raw bytes.

More commonly seen nowadays is HTTPS (Hyper Text Transfer Protocol (Secure)), which is just HTTP layered on top of an encryption protocol like TLS and ensures that messages cannot be read or written to in transit.

# What is a web server?

"A request is sent to the server". What actually is a server? That is for us, the web developers, to decide, but most web apps follow some common patterns.

For most production-level web apps, the IP address the browser connects to belongs to a machine running a reverse proxy or load balancer. These terms are pretty muddy and are often used interchangeably, but at a high level they both accept incoming requests and forward them to other services.

The most common web server/reverse proxy/load balancer software is Nginx. Nginx receives incoming HTTP requests and maps the URL in the request's start-line to a handler, like serving a static file on disk directly or forwarding the request to an application server.

# What does a web server serve?

"The server processes the request and sends a response". What kind of data does the server respond with that allows the browser to build a webpage?

HTML (HyperText Markup Language) describes the content and structure of a web page. The browser first reads the HTML document and builds a data model from it, the DOM (Document Object Model), which acts as the foundation everything else is built on.

CSS (Cascading Style Sheets) defines how the content looks: colors, fonts, spacing, positioning, behavior for different screen sizes, etc. The browser parses CSS into another structure called the CSSOM (CSS Object Model), then uses this to apply CSS rule to every element in the DOM.

JS (JavaScript) makes the page interactive and dynamic. When the browser encounters an HTML `script` element like `<script src="app.js"></script>`, it knows to download and execute that JavaScript file before doing anything else. Why JavaScript and not something like C++ or Python? Because the early web needed a lightweight scripting language to quickly execute code in and JavaScript, the scripting language for Netscape (the most popular browser at the time), was just decided on as industry standard.

# How does a web server serve?

So we know that the core of the website is the HTML document, through which we can tell the browser to fetch and run JavaScript scripts. But the way that HTML gets produced varies depending on your architecture.

The most basic web server is just a static file server. Say you have a folder on disk like:

```
/var/www/html/
	├── index.html
	├── style.css
	└── app.js
```

The web server maps URL `/` to `/var/www/html/index.html`. When a client sends `GET /`, the server reads the file and responds with raw HTML. The browser then fetches any CSS/JS referenced in it. This is simple, fast, and has good SEO, but the same HTML goes to every user on every request and so can't really be used for creating more dynamic websites.

Server-Side Rendering (SSR) is where the server generates HTML at request time. Instead of serving a pre-written file, the server runs application code to build the HTML dynamically (querying a database, checking auth, personalizing content) then sends the fully-formed HTML to the browser. The browser gets complete HTML immediately, which is good for performance and SEO. The trade-off is that every request requires server processing time, so it's slower and puts more load on your infrastructure. Traditional web frameworks like Rails or Django work this way, and modern ones like Next.js support SSR as well.

Static Site Generation (SSG) is like SSR, but at build time rather than request time. Before deploying, a build step pre-renders every page into fully-formed HTML files, which can then be served statically. You get the dynamic data benefits of SSR during the build, but the simplicity and speed of static serving at runtime. The limitation of SSG is that content is only as fresh as your last build, so it's a poor fit for rendering frequently changing/user-specific data.

Client-Side Rendering (CSR) is where HTML is generated in the browser at runtime. The server sends a minimal HTML shell and a JavaScript bundle, and the browser then downloads and executes this JavaScript in order to construct the page. CSR is often used to build Single Page Applications (SPAs), where the browser loads one HTML document once and handles all subsequent navigation client-side by intercepting clicks and swapping in new content without a full page reload. The downside is that the browser receives an empty shell initially, so content appears later and search engines have a harder time indexing it.

In practice, most modern frameworks (Next.js, Nuxt, SvelteKit, Astro) are hybrid and let you mix these strategies per page. A marketing page might be SSG for maximum speed, a dashboard SSR for fresh personalized data, and a rich interactive editor CSR for complex client state.
