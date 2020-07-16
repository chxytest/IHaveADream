import { request } from './request'

export function getDetailData(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: "/recommend",
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor(shopInfo) {
    this.name = shopInfo.name
    this.shopLogo = shopInfo.shopLogo
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
    this.cFans = shopInfo.cFans
  }
}

export class Params {
  constructor(paramInfo, paramRule) {
    this.image = paramInfo.image ? paramInfo.images[0] : '';
    this.rulekey = paramRule.key
    this.tables = paramRule.tables
    this.infokey = paramInfo.key
    this.set = paramInfo.set

  }
}