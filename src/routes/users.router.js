import 'dotenv/config.js';
import Router from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateJWT from '../authenticateJWT.js';

const router = Router();
const saltRounds = 10;
const secret = process.env.SECRET_KEY;


// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id
router.get('/current', authenticateJWT, (req, res) => {
  res.status(200).json({
    message: 'User authenticated',
    user: req.user 
  });
});

// POST /users
// Al momento de guardar el usuario se debe hashear la password

router.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role || "user",
      });
      
      await user.save();
    res.redirect('/login');

    } catch (error) {
      console.log('error', error);
      res.status(400).json({ message: error.message });
    }
  });

router.post('/login', async (req, res) => {
  try{

    console.log('buscando usuario');
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      console.log('usuario no encontrado');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('usuario encontrado', user);
    console.log('comparando password');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log('password invalido');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('creando token');
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
    res.cookie('coderCookieToken', token, { httpOnly: true });
    console.log('cookie creada', token);
    res.redirect('/current');
  }
 catch (error) {
    console.log('error', error);
    res.status(400).json({ message: error.message });
  }
});




// PATCH /users/:id
/* router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }

  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  if (req.body.password != null) {
    res.user.password = await bcrypt.hash(req.body.password, saltRounds);
  }
  

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); */

export default router;