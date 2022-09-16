const bigObj = [
  {
    id: 1,
    customer_id: 1,
    created_at: '2022-09-14T13:32:05.253Z',
    updated_at: '2022-09-14T13:32:05.253Z',
    items:
      '{"6":{"id":6,"name":"Vegetable Oil","price":"130.0","qauntity":1,"subTotal":130},"17":{"id":17,"name":"Peak","price":"70.0","qauntity":1,"subTotal":70},"31":{"id":31,"name":"Dry fish","price":"100.0","qauntity":1,"subTotal":100}}',
  },
  {
    id: 2,
    customer_id: 2,
    created_at: '2022-09-14T13:38:01.326Z',
    updated_at: '2022-09-14T13:38:01.326Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"10":{"id":10,"name":"Vegetable Oil","price":"70.0","qauntity":1,"subTotal":70},"13":{"id":13,"name":"Red oil","price":"50.0","qauntity":1,"subTotal":50},"19":{"id":19,"name":"Maggi - Star","price":"60.0","qauntity":1,"subTotal":60}}',
  },
  {
    id: 3,
    customer_id: 3,
    created_at: '2022-09-14T13:40:30.304Z',
    updated_at: '2022-09-14T13:40:30.304Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"10":{"id":10,"name":"Vegetable Oil","price":"70.0","qauntity":1,"subTotal":70}}',
  },
  {
    id: 4,
    customer_id: 4,
    created_at: '2022-09-14T13:48:05.646Z',
    updated_at: '2022-09-14T13:48:05.646Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"6":{"id":6,"name":"Vegetable Oil","price":"130.0","qauntity":1,"subTotal":130}}',
  },
  {
    id: 5,
    customer_id: 5,
    created_at: '2022-09-14T13:53:13.732Z',
    updated_at: '2022-09-14T13:53:13.732Z',
    items:
      '{"14":{"id":14,"name":"Milo","price":"120.0","qauntity":1,"subTotal":120},"16":{"id":16,"name":"Peak","price":"130.0","qauntity":1,"subTotal":130},"22":{"id":22,"name":"Vegetable Oil","price":"300.0","qauntity":1,"subTotal":300}}',
  },
  {
    id: 6,
    customer_id: 6,
    created_at: '2022-09-14T13:55:14.546Z',
    updated_at: '2022-09-14T13:55:14.546Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"17":{"id":17,"name":"Peak","price":"70.0","qauntity":1,"subTotal":70}}',
  },
  {
    id: 7,
    customer_id: 7,
    created_at: '2022-09-14T13:59:55.982Z',
    updated_at: '2022-09-14T13:59:55.982Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":2,"subTotal":160},"10":{"id":10,"name":"Vegetable Oil","price":"70.0","qauntity":2,"subTotal":140},"11":{"id":11,"name":"Semo","price":"65.0","qauntity":2,"subTotal":130}}',
  },
  {
    id: 8,
    customer_id: 8,
    created_at: '2022-09-14T14:04:51.413Z',
    updated_at: '2022-09-14T14:04:51.413Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"10":{"id":10,"name":"Vegetable Oil","price":"70.0","qauntity":1,"subTotal":70},"11":{"id":11,"name":"Semo","price":"65.0","qauntity":1,"subTotal":65}}',
  },
  {
    id: 9,
    customer_id: 9,
    created_at: '2022-09-14T14:06:07.311Z',
    updated_at: '2022-09-14T14:06:07.311Z',
    items:
      '{"2":{"id":2,"name":"Goat","price":"250.0","qauntity":1,"subTotal":250}}',
  },
  {
    id: 10,
    customer_id: 10,
    created_at: '2022-09-14T14:08:21.235Z',
    updated_at: '2022-09-14T14:08:21.235Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":2,"subTotal":540},"6":{"id":6,"name":"Vegetable Oil","price":"130.0","qauntity":1,"subTotal":130},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"11":{"id":11,"name":"Semo","price":"65.0","qauntity":1,"subTotal":65},"27":{"id":27,"name":"Sugar","price":"60.0","qauntity":1,"subTotal":60}}',
  },
  {
    id: 11,
    customer_id: 11,
    created_at: '2022-09-14T14:14:56.535Z',
    updated_at: '2022-09-14T14:14:56.535Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"31":{"id":31,"name":"Dry fish","price":"100.0","qauntity":3,"subTotal":300}}',
  },
  {
    id: 12,
    customer_id: 12,
    created_at: '2022-09-14T14:18:27.024Z',
    updated_at: '2022-09-14T14:18:27.024Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270}}',
  },
  {
    id: 13,
    customer_id: 14,
    created_at: '2022-09-14T14:21:33.472Z',
    updated_at: '2022-09-14T14:21:33.472Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80}}',
  },
  {
    id: 14,
    customer_id: 15,
    created_at: '2022-09-14T14:22:51.695Z',
    updated_at: '2022-09-14T14:22:51.695Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"11":{"id":11,"name":"Semo","price":"65.0","qauntity":1,"subTotal":65},"12":{"id":12,"name":"Indomie","price":"60.0","qauntity":1,"subTotal":60}}',
  },
  {
    id: 15,
    customer_id: 16,
    created_at: '2022-09-14T14:26:56.560Z',
    updated_at: '2022-09-14T14:26:56.560Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"4":{"id":4,"name":"Chicken","price":"100.0","qauntity":2,"subTotal":200},"11":{"id":11,"name":"Semo","price":"65.0","qauntity":1,"subTotal":65},"12":{"id":12,"name":"Indomie","price":"60.0","qauntity":1,"subTotal":60},"19":{"id":19,"name":"Maggi - Star","price":"60.0","qauntity":1,"subTotal":60},"22":{"id":22,"name":"Vegetable Oil","price":"300.0","qauntity":1,"subTotal":300},"31":{"id":31,"name":"Dry fish","price":"100.0","qauntity":1,"subTotal":100},"32":{"id":32,"name":"Spices","price":"50.0","qauntity":1,"subTotal":50}}',
  },
  {
    id: 16,
    customer_id: 17,
    created_at: '2022-09-14T14:28:50.506Z',
    updated_at: '2022-09-14T14:28:50.506Z',
    items:
      '{"7":{"id":7,"name":"Rice","price":"75.0","qauntity":1,"subTotal":75},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"10":{"id":10,"name":"Vegetable Oil","price":"70.0","qauntity":1,"subTotal":70},"12":{"id":12,"name":"Indomie","price":"60.0","qauntity":1,"subTotal":60},"32":{"id":32,"name":"Spices","price":"50.0","qauntity":1,"subTotal":50}}',
  },
  {
    id: 17,
    customer_id: 18,
    created_at: '2022-09-14T14:31:37.281Z',
    updated_at: '2022-09-14T14:31:37.281Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"16":{"id":16,"name":"Peak","price":"130.0","qauntity":1,"subTotal":130}}',
  },
  {
    id: 18,
    customer_id: 19,
    created_at: '2022-09-14T14:33:40.239Z',
    updated_at: '2022-09-14T14:33:40.239Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"9":{"id":9,"name":"Macaroni","price":"80.0","qauntity":1,"subTotal":80},"10":{"id":10,"name":"Vegetable Oil","price":"70.0","qauntity":1,"subTotal":70},"13":{"id":13,"name":"Red oil","price":"50.0","qauntity":1,"subTotal":50}}',
  },
  {
    id: 19,
    customer_id: 20,
    created_at: '2022-09-14T14:35:28.728Z',
    updated_at: '2022-09-14T14:35:28.728Z',
    items:
      '{"5":{"id":5,"name":"Malt","price":"100.0","qauntity":1,"subTotal":100},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"12":{"id":12,"name":"Indomie","price":"60.0","qauntity":1,"subTotal":60},"13":{"id":13,"name":"Red oil","price":"50.0","qauntity":1,"subTotal":50},"26":{"id":26,"name":"Wheat","price":"50.0","qauntity":1,"subTotal":50},"28":{"id":28,"name":"Tomato","price":"60.0","qauntity":1,"subTotal":60}}',
  },
  {
    id: 20,
    customer_id: 21,
    created_at: '2022-09-14T14:37:34.004Z',
    updated_at: '2022-09-14T14:37:34.004Z',
    items:
      '{"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"22":{"id":22,"name":"Vegetable Oil","price":"300.0","qauntity":1,"subTotal":300},"26":{"id":26,"name":"Wheat","price":"50.0","qauntity":1,"subTotal":50}}',
  },
  {
    id: 21,
    customer_id: 22,
    created_at: '2022-09-14T14:39:04.780Z',
    updated_at: '2022-09-14T14:39:04.780Z',
    items:
      '{"20":{"id":20,"name":"Maggi - Star","price":"40.0","qauntity":1,"subTotal":40}}',
  },
  {
    id: 22,
    customer_id: 23,
    created_at: '2022-09-14T14:40:29.133Z',
    updated_at: '2022-09-14T14:40:29.133Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"12":{"id":12,"name":"Indomie","price":"60.0","qauntity":1,"subTotal":60},"15":{"id":15,"name":"Milo","price":"65.0","qauntity":1,"subTotal":65}}',
  },
  {
    id: 23,
    customer_id: 24,
    created_at: '2022-09-14T14:43:51.287Z',
    updated_at: '2022-09-14T14:43:51.287Z',
    items:
      '{"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"10":{"id":10,"name":"Vegetable Oil","price":"70.0","qauntity":1,"subTotal":70}}',
  },
  {
    id: 24,
    customer_id: 25,
    created_at: '2022-09-14T14:45:19.003Z',
    updated_at: '2022-09-14T14:45:19.003Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80}}',
  },
  {
    id: 25,
    customer_id: 26,
    created_at: '2022-09-14T14:47:07.111Z',
    updated_at: '2022-09-14T14:47:07.111Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80}}',
  },
  {
    id: 26,
    customer_id: 27,
    created_at: '2022-09-14T14:48:30.693Z',
    updated_at: '2022-09-14T14:48:30.693Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270},"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80}}',
  },
  {
    id: 27,
    customer_id: 28,
    created_at: '2022-09-14T14:51:53.876Z',
    updated_at: '2022-09-16T18:47:43.191Z',
    items:
      '{"3":{"id":3,"name":"Rice","price":"145.0","qauntity":1,"subTotal":145},"13":{"id":13,"name":"Red oil","price":"50.0","qauntity":1,"subTotal":50}}',
  },
  {
    id: 29,
    customer_id: 30,
    created_at: '2022-09-14T14:54:43.906Z',
    updated_at: '2022-09-16T18:52:29.282Z',
    items:
      '{"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"13":{"id":13,"name":"Red oil","price":"50.0","qauntity":1,"subTotal":50}}',
  },
  {
    id: 28,
    customer_id: 29,
    created_at: '2022-09-14T14:53:17.964Z',
    updated_at: '2022-09-14T14:58:21.541Z',
    items:
      '{"1":{"id":1,"name":"Rice","price":"270.0","qauntity":1,"subTotal":270}}',
  },
  {
    id: 30,
    customer_id: 13,
    created_at: '2022-09-14T15:31:57.091Z',
    updated_at: '2022-09-14T15:31:57.091Z',
    items:
      '{"9":{"id":9,"name":"Macaroni","price":"80.0","qauntity":1,"subTotal":80},"11":{"id":11,"name":"Semo","price":"65.0","qauntity":1,"subTotal":65},"12":{"id":12,"name":"Indomie","price":"60.0","qauntity":1,"subTotal":60}}',
  },
  {
    id: 31,
    customer_id: 33,
    created_at: '2022-09-16T18:49:24.743Z',
    updated_at: '2022-09-16T18:49:24.743Z',
    items:
      '{"8":{"id":8,"name":"Spaghetti","price":"80.0","qauntity":1,"subTotal":80},"13":{"id":13,"name":"Red oil","price":"50.0","qauntity":1,"subTotal":50}}',
  },
];

const array = [];
bigObj.map(({ items }) => {
  const itema = JSON.parse(items);
  const ab = Object.values(itema);
  ab.map((el) => {
    const { id, name, qauntity } = el;
    array.push({ id, name, qauntity });
  });
});

const ans = array.reduce((obj, item) => {
  obj[item.id]
    ? (obj[item.id].qauntity += item.qauntity)
    : (obj[item.id] = item);
  return obj;
}, {});

// console.log(ans);
