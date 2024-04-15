const { ConnectionPool } = require('mssql');

const config = {
  user: 'root',
  password: 'test@123',
  server: 'localhost',
  database: 'dbAssociation',
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const pool = new ConnectionPool(config);

pool
  .connect()
  .then(() => {
    console.log('Connected to MSSQL database');

    const datas = [
      {
        user_id: '5a60437e-7454-4524-ea17-08dc2d1bd9df',
        title:
          'ROLLS-ROYCE MOTOR CARS PRESENTS CONTEMPORARY COMMISSIONS AT FESTIVAL OF SPEED',
        subtitle: 'ROLLS-ROYCE MOTOR CARS PRESSCLUB · ARTICLE',
        cover_image_link:
          'https://mediapool.bmwgroup.com/cache/P9/202307/P90514075/P90514075-rolls-royce-motor-cars-presents-contemporary-commissions-at-festival-of-speed-2400px.jpg',
        content_link: 'adab7e00-78f4-4279-8cb7-f124d3bf598f.md',
        status_id: 1,
        lifetime: null,
        scheduled_on: null,
        published_date_time: null,
        created_date_time: new Date(),
        archived_date_time: null,
      },
      {
        user_id: '5a60437e-7454-4524-ea17-08dc2d1bd9df',
        title: 'BMW Joyfest',
        subtitle:
          'An adrenaline fueled celebration where you can take control of your favorite BMW and watch your adrenaline levels race off the chart.',
        cover_image_link:
          'https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/teaserimages/joyfest/joyfest_page_1680x756.jpg/jcr:content/renditions/cq5dam.resized.img.1680.large.time1648640384362.jpg',
        content_link: '74fc4079-5daa-4acd-9750-7b507e4d01b0.md',
        status_id: 1,
        lifetime: null,
        scheduled_on: null,
        published_date_time: null,
        created_date_time: new Date(),
        archived_date_time: null,
      },
      {
        user_id: '5a60437e-7454-4524-ea17-08dc2d1bd9df',
        title: 'Cross-country Olympic (XCO)',
        subtitle:
          'Cross-country races are mass-start, multi-lap races held over undulating circuits of 4 to 6 km. Courses for this race are challenging with a lot of technical sections like rock gardens, jumps, drops, ramps, berms, etc.',
        cover_image_link:
          'https://img.redbull.com/images/q_auto,f_auto/redbullcom/2020/10/7/xu83cl3qa5qp84dpo1vk/mtb-himalaya-david-kumar-cross-country-marathon',
        content_link: 'ec318e73-1144-4c93-babb-cc1ccd61d9fb.md',
        status_id: 1,
        lifetime: null,
        scheduled_on: null,
        published_date_time: null,
        created_date_time: new Date(),
        archived_date_time: null,
      },
      {
        user_id: '5a60437e-7454-4524-ea17-08dc2d1bd9df',
        title: 'BIKE SHED MOTO SHOW',
        subtitle:
          'The Bike Shed now dominates the "hipster" biker scene in the UK and can hold its own against any of the motorcycling events on this list.',
        cover_image_link:
          'https://www.rst-moto.com/img/asset/YXNzZXRzLzIwMjItYmlrZS1zaGVkLXNob3cuanBn?fm=webp&q=90&fit=crop-50-50&w=843&h=562&s=2c40f68dd78d14b2e46556492c84b785',
        content_link: 'c2da8beb-9ca4-4dc7-b8ba-7aa53d22cb8f.md',
        status_id: 1,
        lifetime: null,
        scheduled_on: null,
        published_date_time: null,
        created_date_time: new Date(),
        archived_date_time: null, // tags- 22, 23, 24
      },
      {
        user_id: '5a60437e-7454-4524-ea17-08dc2d1bd9df',
        title: 'Audi Tradition at many international events in 2024',
        subtitle:
          'Experience history through vehicles from Audi’s historical collection, lectures at the Audi museum mobile, and events around the world',
        cover_image_link:
          'https://uploads.audi-mediacenter.com/system/production/media/122844/images/886f56b11452c238a9ef699011ce5205a5aa207f/A240766_web_960.jpg?1706859765',
        content_link: 'b2f3cf1f-6950-4cd1-9138-02a6f06d5b20.md',
        status_id: 1,
        lifetime: null,
        scheduled_on: null,
        published_date_time: null,
        created_date_time: new Date(),
        archived_date_time: null, // tags- 25, 26, 27
      },
    ];

    // Define the SQL query
    const insertQuery = `
   INSERT INTO post (user_id, title, subtitle, cover_image_link, content_link, status_id, lifetime, published_date_time, archived_date_time, created_date_time)
   VALUES (@user_id, @title, @subtitle, @cover_image_link, @content_link, @status_id, @lifetime, @published_date_time, @archived_date_time, @created_date_time)
 `;

    datas.forEach((postData) => {
      // Execute the query
      pool
        .request()
        .input('user_id', postData.user_id)
        .input('title', postData.title)
        .input('subtitle', postData.subtitle)
        .input('cover_image_link', postData.cover_image_link)
        .input('content_link', postData.content_link)
        .input('status_id', postData.status_id)
        .input('lifetime', postData.lifetime)
        .input('published_date_time', postData.published_date_time)
        .input('archived_date_time', postData.archived_date_time)
        .input('created_date_time', postData.created_date_time)
        .query(insertQuery)
        .then((result) => {
          console.log('Inserted successfully');
          pool.close();
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
          pool.close();
        });
    });
  })
  .catch((error) => {
    console.error('Error connecting to MSSQL database:', error);
  });
