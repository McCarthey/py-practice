// @ts-nocheck
import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import { DmLoggerService } from '@app/dm-logger/dm-logger.service';
import { ErecWrapperService } from '@src/service/erec-wrapper.service';
import java from 'js-to-java';
import { ISearchPageRequest, ISearchPageResponse } from '@common/interface/search-page';
import { IDetailPageRequest, IDetailPageResponse } from '@common/interface/detail-page';
import { useCache } from '@src/util/res';

@Controller('')
export class NextController {
    constructor(private logger: DmLoggerService, private erecService: ErecWrapperService) {}

    /**
     * 首页
     * @param query
     * @param res
     */
    @Get('')
    async index(@Query() query: any, @Req() req: any, @Res() res: any) {
        this.logger.debug(query);
        // todo 推荐商品接口 =》 调用运营接口
        // const html = await res.nextServer.renderToHTML(req, res, '/index', { cats: res.cats });
        return useCache(req, res, '/index', { cats: res.cats });
    }

    @Get('result')
    async search(@Query() query: ISearchPageRequest, @Req() req: any, @Res() res: any) {
        this.logger.debug(`查看路由参数：${JSON.stringify(query)}`);

        const response: ISearchPageResponse = {
            cats: res.cats,
        };

        // 并发请求队列
        const reqQueue = [];

        // 参数处理
        if (query.cat) {
            query.catId = query.cat.split(',').map(i => +i);
            // 携带了catId的需要查询分类的属性列表，约定：只有一个分类的时候才查询属性
            if (query.catId.length === 1) {
                reqQueue.push(
                    // @ts-ignore
                    this.erecService.cat.get(java.int(query.catId[0])).then(catAttrs => (response.catAttrs = catAttrs)),
                );
            }
        }

        if (query.attrs) {
            query.attribute = query.attrs.split(',').map(i => +i);
        }

        // 默认每页40
        if (!query.size) {
            query.size = 40;
        }

        // 剥离无需传递的参数
        delete query.cat;
        delete query.attrs;

        // 商品搜索请求入队
        reqQueue.push(this.erecService.goods.search(query).then(searchResult => (response.searchResult = searchResult)));

        // 并发请求
        await Promise.all(reqQueue);

        this.logger.debug(JSON.stringify(response.searchResult.items.length));

        return useCache(req, res, '/result', response);
    }

    @Get('detail')
    async detail(@Query() query: IDetailPageRequest, @Req() req: any, @Res() res: any) {
        this.logger.debug(query);

        const reqQueue = [];
        const response: IDetailPageResponse = {
            cats: res.cats,
        };

        // 商品详情数据 , 后面的接口请求依赖该接口返回，所以不入队
        response.goodDetail = await this.erecService.goods.detail(query.id);

        // 相似商品数据
        reqQueue.push(this.erecService.goods.sim(query.id).then(simGoods => (response.simGoods = simGoods)));

        // 商品历史数据
        reqQueue.push(this.erecService.goods.history(query.id).then(goodHistory => (response.goodHistory = goodHistory)));

        // 相同商品
        reqQueue.push(this.erecService.goods.sames(response.goodDetail.cid).then(item => (response.sameGoods = item)));

        // 比价
        reqQueue.push(this.erecService.clusterGoods.getByCId(response.goodDetail.cid).then(item => (response.clusterGoods = item)));

        await Promise.all(reqQueue);

        // this.logger.debug(`相似商品：${JSON.stringify(response.simGoods)}`);
        this.logger.debug(`sameGoods：${JSON.stringify(response.sameGoods)}`);
        this.logger.debug(`clusterGoods：${JSON.stringify(response.clusterGoods)}`);

        return useCache(req, res, '/detail', response);
    }

    @Get('demo')
    demo(@Query() query: any, @Res() res: any) {
        this.logger.debug(query);
        return res.nextRender('/demo', { cats: res.cats });
    }
}
