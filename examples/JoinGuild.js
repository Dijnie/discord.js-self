import Captcha from '2captcha';
import { Client } from '@discord-selfbot-sdk/bot';

const solver = new Captcha.Solver('<2captcha key>');

const client = new Client({
	captchaSolver: function (captcha, UA) {
		return solver
			.hcaptcha(captcha.captcha_sitekey, 'discord.com', {
				invisible: 1,
				userAgent: UA,
				data: captcha.captcha_rqdata,
			})
			.then((res) => res.data);
	},
	captchaRetryLimit: 3,
});

client.on('ready', async () => {
	console.log('Ready!', client.user.tag);
	await client.acceptInvite('mdmc');
});

client.login(process.env.DISCORD_TOKEN);
