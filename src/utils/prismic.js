import * as prismic from '@prismicio/client';

// Update this if your Prismic repository name is different!
export const repositoryName = 'tsplgroup-blog';

export const client = prismic.createClient(repositoryName, {
  // If your repository is private, add an access token here:
  // accessToken: 'YOUR_ACCESS_TOKEN',
  
  // This helps configure routing for Prismic links automatically
  routes: [
    {
      type: 'blog_post',
      path: '/blog/:uid',
    },
  ],
});
