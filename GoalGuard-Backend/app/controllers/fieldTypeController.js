const db = require('../config/db');

exports.addFieldType = async (req, res) => {
    try {
        const { type, status } = req.body;

        // Kiểm tra xem loại sân bóng đã tồn tại trong cơ sở dữ liệu chưa
        const [existingFieldTypes] = await db.execute('SELECT id FROM field_types WHERE type = ?', [type]);
        if (existingFieldTypes.length > 0) {
            return res.status(200).json({ message: 'Loại sân bóng đã tồn tại' });
        }

        // Tiến hành thêm loại sân bóng mới
        const [result] = await db.execute('INSERT INTO field_types (type, status) VALUES (?, ?)', [type, status]);
        res.status(200).json({ id: result.insertId, type, status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding field type' });
    }
};


exports.updateFieldType = async (req, res) => {
    try {
        const { type } = req.body;
        const id = req.params.id;

        // Kiểm tra xem loại sân bóng mới không trùng với các loại sân bóng khác (trừ chính loại sân bóng đang cập nhật)
        if (type !== undefined) {
            const [existingFieldTypes] = await db.execute('SELECT id FROM field_types WHERE type = ? AND id != ?', [type, id]);
            if (existingFieldTypes.length > 0) {
                return res.status(200).json({ message: 'Loại sân bóng đã tồn tại' });
            }
        }

        // Tiếp tục quá trình cập nhật loại sân bóng
        await db.execute('UPDATE field_types SET type = ? WHERE id = ?', [type, id]);
        res.status(200).json({ id, type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating field type' });
    }
};


exports.deleteFieldType = async (req, res) => {
    try {
        const id = req.params.id;
        await db.execute('DELETE FROM field_types WHERE id = ?', [id]);
        res.status(200).json({ message: 'Field type deleted successfully' });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            res.status(200).json({ message: 'Không thể xóa loại sân này vì đã có sân liên kết đến nó.' });
        } else {
            res.status(500).json({ message: 'Error deleting filed type' });
        }
    }
};

exports.getFieldTypeById = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute('SELECT * FROM field_types WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Field type not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting field type' });
    }
};

exports.getAllFieldTypes = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM field_types');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting field types' });
    }
};

exports.searchFieldTypes = async (req, res) => {
    try {
        let keyword = req.query.keyword || ''; // Nếu không có từ khóa, sẽ gán giá trị rỗng
        let query = 'SELECT * FROM field_types'; // Truy vấn cơ sở dữ liệu mặc định

        if (keyword !== '') {
            query += ' WHERE type LIKE ?'; // Nếu có từ khóa, thêm điều kiện vào truy vấn SQL
        }

        const [rows] = await db.execute(query, [`%${keyword}%`]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching field types' });
    }
};
