import type { NuxtAxiosInstance } from '@nuxtjs/axios';

export default function ({ $axios }: { $axios: NuxtAxiosInstance }) {
  $axios.onRequest((request) => {
    request.headers.common[
      'Authorization'
    ] = `Bearer ${process.env.accessToken}`;

    return request;
  });
}
