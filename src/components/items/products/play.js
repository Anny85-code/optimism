// const obj = {};
// const arr = [
//   { a: 10, b: 15, c: 5 },
//   { a: 2, b: 18, c: 8, d: 20 },
// ];

// arr.map((object) => {
//   for (const key in object) {
//     // if (Object.hasOwnProperty.call(object, key)) {
//     //   // const element = object[key];
//     //   console.log(key);
//     // }
//     if (key) {
//       obj[key] = object[key];
//     }
//   }
//   console.log(obj);
// });

// arr.map((ob) => {
//   const ay = Object.keys(ob);
//   // const xy = Object.values(ob);
//   ay.map((k) => {
//     if (k) {
//       obj[k] += k;
//     }
//   });
// });

// const ui = { a: 10, b: 5 };

// // console.log(Object.keys(ui));
// console.log(obj);

const arr = [
  {
    car: 'audi',
    value: 5,
  },
  {
    car: 'audi',
    value: 7,
  },
  {
    car: 'fiat',
    value: 2,
  },
  {
    car: 'fiat',
    value: 8,
  },
  {
    car: 'benz',
    value: 4,
  },
  {
    car: 'Toyota',
    value: 8,
  },
  {
    car: 'benz',
    value: 8,
  },
  {
    car: 'Toyota',
    value: 5,
  },
];

const result = Object.entries(
  arr.reduce((acc, { car, value }) => {
    if (acc[car]) {
      return {
        ...acc,
        [car]: [...acc[car], value],
      };
    }

    return { ...acc, [car]: [value] };
  }, []),
);
// .map(([car, values]) => {
//   const total = values.reduce((a, b) => a + b);
//   return { car, values, total };
// });

console.log(result);
