const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the WhatsApp client with local authentication
// This saves the session so you don't have to scan the QR code every time
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

console.log('Starting WhatsApp Bot...');

// Generate and display the QR code in the terminal
client.on('qr', (qr) => {
    console.log('Scan this QR code with your WhatsApp "Linked Devices" screen (Number +91 7397511613):');
    qrcode.generate(qr, { small: true });
});

// Log when the client successfully connects
client.on('ready', () => {
    console.log('WhatsApp Bot is connected and ready!');
    console.log('Listening for incoming messages...');
});

// Listen for incoming messages
client.on('message', async (message) => {
    const text = message.body.toLowerCase();

    // Ignore messages from groups (optional, but good for a personal bot)
    if (message.from.endsWith('@g.us')) return;

    // Log the message
    console.log(`Received message from ${message.from}: ${message.body}`);

    // Basic auto-reply logic
    if (text === 'ping') {
        message.reply('pong');
    } else if (text === 'hi' || text === 'hello') {
        const reply = `Hello! Welcome to the Rotaract Club of Info Institute of Engineering Assistant Bot 🤖.

How can I help you today?
1. Type *info* to learn about our club.
2. Type *ping* to check if I'm alive.
3. For anything else, a team member will get back to you soon.`;
        message.reply(reply);
    } else if (text === 'info') {
        message.reply('We are the Rotaract Club of Info Institute of Engineering! \n\n"ACT, MAKE AN IMPACT."\nTheme: Strength Through Unity.\n\nVisit our website to see our projects and galleries: https://racinfo.in (or https://racinfo.org)');
    }
});

// Handle authentication failures or disconnections
client.on('auth_failure', msg => {
    console.error('Authentication failure:', msg);
});

client.on('disconnected', (reason) => {
    console.log('WhatsApp Bot disconnected:', reason);
});

// Start the client
client.initialize();
