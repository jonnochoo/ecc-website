Evangelical Chinese Church Web Site
===================================

Setting Up For Development
--------------------------

**Prerequisites**

- Node.js
- Redis

**Steps**

Run the following via the command line in the root of the project.

1. *npm install*
2. *npm install -g gulp*
3. Copy config.default.js to config.js
4. Enter the respective configuration in config.js
5. *gulp dev*

**Notes**

The calendar/events page is populated from the ECC Google Calendar. However
for performance reasons, the events data is loaded from Redis. To 'sync' the
calendar, go to the URL http://the-domain-of-site/events/save

Use a site like Pingdom to monitor this URL, hence avoid the need to write
a scheduled task to refresh this.
