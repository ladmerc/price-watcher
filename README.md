NodeJs price watcher that sends a mail notification of sudden price drops for an Amazon product (example product B00FE2N1WS). Project uses [agenda](https://github.com/agenda/agenda) for background task processing and nodemailer for sending notification mails


### Steps to run

This project relies on the existence of two environment variables: `MONGODB_URI` and `ZINC_TOKEN`. 
For convenience, you can specify these values when starting the app. Instructions below:

1. Make sure nodeJs > 8, yarn and mongo is installed
2. Run `yarn` in the project root. This installes the dependencies
3. On your terminal, run: `MONGODB_URI=mongodb://testuser:password1@ds123834.mlab.com:23834/zinc ZINC_TOKEN=B9DD68C645191A9DD0E57556 yarn dev`
4. The app starts a webserver and schedules a background task that runs the price checks. By default, this task runs every 60 minutes, but you can configure the period by passing `CHECK_INTERVAL=x` when doing step 3 above. `x` in that case should be a number in minutes
5. When there's been a price drop, the app attempts to send a mail. As I used a test SMTP server, a url is generated on the console when the price drop occurs. Opening this url in your browser should show the mail content
6. If you run into any issue, logs are in the `logs` folder
