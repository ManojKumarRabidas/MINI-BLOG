const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Set up lowdb with default data structure
const file = path.join(__dirname, '../db/posts.json');
const adapter = new JSONFile(file);
const defaultData = { posts: [] };
const db = new Low(adapter, defaultData);

// Initialize database
async function initDB() {
  await db.read();
  // Ensure db.data is always set, even if file is empty
  db.data ||= { posts: [] };
  await db.write();
}

// GET /admin/posts
exports.getPosts = async (req, res) => {
  try {
    await initDB();
    res.json(db.data.posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// POST /admin/posts
exports.createPost = async (req, res) => {
  try {
    await initDB();
    console.log("req.body", req.body)
    const { title, body } = req.body;

    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
    };

    db.data.posts.push(newPost);
    await db.write();

    res.status(201).json(newPost);
  } catch (err) {
    console.log("err", err)
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// PUT /admin/posts/:id
exports.updatePost = async (req, res) => {
  try {
    await initDB();
    const postId = parseInt(req.params.id, 10);
    const { title, body } = req.body;

    const post = db.data.posts.find(p => p.id === postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.title = title?.trim() || post.title;
    post.body = body?.trim() || post.body;

    await db.write();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// DELETE /admin/posts/:id
exports.deletePost = async (req, res) => {
  try {
    await initDB();
    const postId = parseInt(req.params.id, 10);

    const initialCount = db.data.posts.length;
    db.data.posts = db.data.posts.filter(p => p.id !== postId);

    if (db.data.posts.length === initialCount) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await db.write();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
