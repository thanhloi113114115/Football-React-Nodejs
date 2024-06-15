const db = require('../config/db');

const createTables = async () => {
    try {
        // Tạo bảng "users" nếu chưa tồn tại
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(255),
                username VARCHAR(255),
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255),
                status VARCHAR(255) DEFAULT 'noactive',
                image VARCHAR(255) DEFAULT 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('Table "users" created or already exists.');

        await db.execute(`
            CREATE TABLE IF NOT EXISTS employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255),
                status VARCHAR(255) DEFAULT 'active',
                employee_code VARCHAR(255),
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        console.log('Table "employees" created or already exists.');

        // Tạo bảng "password_reset_tokens" nếu chưa tồn tại
        await db.execute(`
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            token VARCHAR(255) NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `);

        console.log('Table "password_reset_tokens" created or already exists.');

        // Tạo bảng field_types nếu chưa tồn tại
        await db.execute(`
         CREATE TABLE IF NOT EXISTS field_types (
             id INT AUTO_INCREMENT PRIMARY KEY,
             type VARCHAR(255) NOT NULL,
             status VARCHAR(255) DEFAULT 'active'
         )
     `);

        console.log('Table "field_types" created or already exists.');

        // Tạo bảng "areas" nếu chưa tồn tại
        await db.execute(`
                CREATE TABLE IF NOT EXISTS areas (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    status VARCHAR(255) DEFAULT 'active'
                )
            `);

        console.log('Table "areas" created or already exists.');

        // Tạo bảng "courts" nếu chưa tồn tại
        await db.execute(`
          CREATE TABLE IF NOT EXISTS courts (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              id_areas INT NOT NULL,
              id_field_types INT NOT NULL,
              id_users INT, 
              approval_status VARCHAR(255) DEFAULT 'pending', 
              status VARCHAR(255) DEFAULT 'active',
              price DECIMAL(10, 2) DEFAULT 0,
              image VARCHAR(500),
              description TEXT,
              FOREIGN KEY (id_areas) REFERENCES areas(id),
              FOREIGN KEY (id_field_types) REFERENCES field_types(id),
              FOREIGN KEY (id_users) REFERENCES users(id)
          )
      `);

        console.log('Table "courts" created or already exists.');

        // Tạo bảng "product_types" nếu chưa tồn tại
        await db.execute(`
         CREATE TABLE IF NOT EXISTS product_types (
             id INT AUTO_INCREMENT PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             status VARCHAR(255) DEFAULT 'active'
         )
     `);

        console.log('Table "product_types" created or already exists.');

        // Tạo bảng "products" nếu chưa tồn tại
        await db.execute(`
         CREATE TABLE IF NOT EXISTS products (
             id INT AUTO_INCREMENT PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             price DECIMAL(10, 2) NOT NULL,
             quantity INT NOT NULL,
             status VARCHAR(255) DEFAULT 'active',
             item_status VARCHAR(255) DEFAULT 'new',
             id_product_type INT,
             id_user INT,
             image VARCHAR(500), 
             FOREIGN KEY (id_product_type) REFERENCES product_types(id),
             FOREIGN KEY (id_user) REFERENCES users(id)
         )
     `);

        console.log('Table "products" created or already exists.');

        // Tạo bảng "tournaments" nếu chưa tồn tại
        await db.execute(`
                CREATE TABLE IF NOT EXISTS tournaments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    info TEXT,
                    teams INT DEFAULT 0,
                    matches INT DEFAULT 0,
                    group_count INT DEFAULT 0, 
                    prizes INT DEFAULT 0,
                    status VARCHAR(255) DEFAULT 'active',
                    approval_status VARCHAR(255) DEFAULT 'pending',
                    id_users INT,
                    image VARCHAR(500), 
                    FOREIGN KEY (id_users) REFERENCES users(id)
                )
            `);
        console.log('Table "tournaments" created or already exists.');

        // Tạo bảng "tournament_results" nếu chưa tồn tại
        await db.execute(`
        CREATE TABLE IF NOT EXISTS tournament_results (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tournament_id INT NOT NULL,
            result_info TEXT,
            image VARCHAR(500),
            FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
        )
    `);

        console.log('Table "tournament_results" created or already exists.');

        // Tạo bảng "bookings" nếu chưa tồn tại
        await db.execute(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            court_id INT NOT NULL,
            booking_date DATE NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            payment_method VARCHAR(255) NOT NULL,
            total_amount DECIMAL(10, 2) NOT NULL,
            status VARCHAR(255) DEFAULT 'pending', -- Tình trạng đặt sân (ví dụ: pending, confirmed, cancelled)
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (court_id) REFERENCES courts(id)  
        )
        `);

        console.log('Table "bookings" created or already exists.');

        // Tạo bảng "orders" nếu chưa tồn tại
        await db.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                total_price DECIMAL(10, 2) NOT NULL,
                payment_method VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id) 
            )
        `);

        console.log('Table "orders" created or already exists.');

        // Tạo bảng "residence_rules" nếu chưa tồn tại
        await db.execute(`
         CREATE TABLE IF NOT EXISTS residence_rules (
             id INT AUTO_INCREMENT PRIMARY KEY,
             title VARCHAR(255) NOT NULL,
             content TEXT,
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         )
     `);

        console.log('Table "residence_rules" created or already exists.');


        // Tạo bảng "notifications" nếu chưa tồn tại
        await db.execute(`
        CREATE TABLE IF NOT EXISTS notifications (
           id INT AUTO_INCREMENT PRIMARY KEY,
           title VARCHAR(255) NOT NULL,
           content TEXT NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
       )
      `);

        console.log('Table "notifications" created or already exists.');

        // Tạo bảng "news" nếu chưa tồn tại
        await db.execute(`
       CREATE TABLE IF NOT EXISTS news (
           id INT AUTO_INCREMENT PRIMARY KEY,
           name VARCHAR(255) NOT NULL,
           description TEXT,
           image VARCHAR(255),
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
       )
   `);

        console.log('Table "news" created or already exists.');


    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
    }
};

createTables();
