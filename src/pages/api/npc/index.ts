import { getJwtSecretKey } from '@/utils/auth';
import {
  newNpc,
  loginNpc,
  getNpc,
  getNpcFromEmail,
  getNpcFromTextureKey,
  getAllNpcs,
  updateNpc,
  deleteNpc,
  getNpcBalance,
  airdrop,
  changePassword,
  npcCount,
} from '@/utils/models/npc-model';
import { authFromServer } from '@/utils/services/useAuth';
import { SignJWT } from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === 'getOneFromEmail') {
    //const { _id } = req.body;
    const email = 'creath.park@gmail.com';
    const user = await getNpcFromEmail(email);
    if (!user.success) {
      res.status(400).json({ status: false, message: user.message });
      return;
    }
    res
      .status(200)
      .json({ status: true, message: 'User found', user: user.user });
  } else if (method === 'getOneFromTextureKey') {
    //const { _id } = req.body;
    const textureKye = 'Hrs_00000001';
    const user = await getNpcFromTextureKey(textureKye);
    if (!user.success) {
      res.status(400).json({ status: false, message: user.message });
      return;
    }
    res
      .status(200)
      .json({ status: true, message: 'User found', user: user.user });
  } else if (method === 'create') {
    const { username, email, pass1, pass2, walletAddress, bonus } = req.body;

    if (!username || !email || !pass1 || !pass2 || !walletAddress) {
      return res.status(400).json({ status: false, message: 'Missing data' });
    }

    /*
    if (!email.includes("@") || !email.includes(".")) {
      return res
        .status(200)
        .json({ status: false, message: "Your email is invalid" });
    }

    if (pass1 !== pass2) {
      return res
        .status(400)
        .json({ status: false, message: "Passwords do not match" });
    }

    if (pass1.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 6 characters",
      });
    }
    */

    let pass = pass1;

    const user = await newNpc(username, email, pass, walletAddress, bonus);
    if (user && user.success === false) {
      return res.status(200).json({ status: false, message: user.message });
    }
    const token = await new SignJWT({ _id: user._id, isAdmin: user.admin })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(getJwtSecretKey());
    if (token) {
      res.setHeader('Set-Cookie', `token=${token}; path=/;`);
      return res.status(200).json({ status: true, message: 'User created' });
    }
    res.status(400).json({ status: false, message: 'Something went wrong' });
  }

  if (method === 'login') {
    const { email, pass } = req.body;
    if (!email || !pass) {
      res.status(400).json({ status: false, message: 'Missing data' });
      return;
    }
    const user = await loginNpc(email);
    if (!user.success) {
      res.status(400).json({ status: false, message: user.message });
      return;
    }
    if (user.user.pass !== pass) {
      res.status(400).json({ status: false, message: 'Wrong password' });
      return;
    }
    const token = await new SignJWT({
      _id: user.user._id,
      isAdmin: user.user.admin,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(getJwtSecretKey());
    if (token) {
      res.setHeader('Set-Cookie', `token=${token}; path=/;`);
      return res
        .status(200)
        .json({ status: true, message: 'You have successfully logged in!' });
    }
    return res
      .status(400)
      .json({ status: false, message: 'Something went wrong' });
  }

  if (method === 'getOne') {
    const { _id } = req.body;
    const user = await getNpc(_id);
    if (!user.success) {
      res.status(400).json({ status: false, message: user.message });
      return;
    }
    res
      .status(200)
      .json({ status: true, message: 'User found', user: user.user });
  }

  if (method === 'getAll') {
    const users = await getAllNpcs();
    if (!users.success) {
      res.status(400).json({ status: false, message: users.message });
      return;
    }
    res
      .status(200)
      .json({ status: true, message: 'Users found', users: users.users });
  }

  if (method === 'update') {
    const {
      _id,
      username,
      email,
      pass,
      deposit,
      img,
      admin,
      newPassToken,
      maticBalance,
      walletAddress,
    } = req.body;
    const user = await updateNpc(
      _id,
      username,
      email,
      pass,
      deposit,
      img,
      admin,
      newPassToken,
      maticBalance,
      walletAddress
    );
    if (!user.success) {
      res.status(400).json({ status: false, message: user.message });
      return;
    }
    res.status(200).json({ status: true, message: 'User updated', user: user });
  }

  if (method === 'delete') {
    const { _id } = req.body;
    const user = await deleteNpc(_id);
    if (!user.success) {
      res.status(400).json({ status: false, message: user.message });
      return;
    }
    let resUser = user.pasifUser;
    return res.status(200).json({ status: true, user: resUser });
  }

  if (method === 'getDeposit') {
    const { _id } = req.body;
    const userBalance = await getNpcBalance(_id);
    if (!userBalance.success) {
      res.status(400).json({ status: false, message: 'User not found' });
      return;
    }
    res.status(200).json({
      status: true,
      message: 'User found',
      userBalance: userBalance.userBalance,
    });
  }

  if (method === 'airdrop') {
    const { amount } = req.body;
    if (!amount) {
      res.status(400).json({ status: false, message: 'Missing data' });
      return;
    }
    const airdropx = await airdrop(amount);
    if (airdropx.success) {
      res.status(200).json({ status: true, message: 'Airdrop success' });
      return;
    }
    res.status(400).json({ status: false, message: 'Something went wrong' });
  }

  if (method === 'changePassword') {
    const { token, oldPassword, newPassword } = req.body;
    if (!token || !oldPassword || !newPassword) {
      return res.status(400).json({ status: false, message: 'Missing data' });
    }
    const { _id: userId } = await authFromServer(token);
    const user = await getNpc(userId);
    if (!user.success) {
      return res.status(400).json({ status: false, message: user.message });
    }
    if (user.user.pass !== oldPassword) {
      return res.status(400).json({ status: false, message: 'Wrong password' });
    }
    const changeUserPassword = await changePassword(userId, newPassword);
    if (!changeUserPassword.success) {
      return res
        .status(400)
        .json({ status: false, message: changeUserPassword.message });
    }
    return res.status(200).json({ status: true, message: 'Password changed' });
  }

  if (method === 'getUserCount') {
    const count = await npcCount();
    if (!count) {
      return res
        .status(400)
        .json({ status: false, message: 'Something went wrong' });
    }
    return res.status(200).json({ status: true, count: count });
  }
}
