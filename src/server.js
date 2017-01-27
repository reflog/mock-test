import { createServer } from 'service-mocker/server';

const { router } = createServer("/api");

router.get('/greet', async (req, res) => {
  console.log(req.headers.get("Authorization"));
  if(!req.headers.get("Authorization") || req.headers.get("Authorization") !== "Bearer: TOKEN!"){
    res.status(403).json({error: "invalid token!"});
  }else
  res.json({msg: 'Hello new world!'});
});

router.post("/login", async (req, res) => {
  let body = await req.json();
  if (body.userName !== 'test@test.com' || body.password !== 'test') {
    res.status(403).json({error: "invalid credentials!"});
  } else {
    res.json({token: "TOKEN!"});
  }
});

// or you can use the shorthand method
router.get('/greet2', 'Hello new world!');