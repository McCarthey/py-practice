import { Dubbo, setting } from 'dubbo2.js';
import service from './service';
import config from './dubbo.config';

const dubboSetting = setting.match(Object.values(config.services), {
  version: '1.0.0',
});

// zookeeper://cloud1:2181?backup=cloud2:2181,cloud3:2181
const dubbo = new Dubbo<typeof service>({
  application: { name: 'erec_service_provider' },
  register: config.register,
  service: service,
  dubboSetting,
});

dubbo.use(async (ctx, next) => {
  await next();
  console.log('-providerAttachments-->', ctx.providerAttachments);
});

dubbo.ready().then(() => {
  console.log('dubbo was ready');
});

export default dubbo;
