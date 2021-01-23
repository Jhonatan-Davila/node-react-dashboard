import { cinfo, cerr } from 'simple-color-print';
import { Controller, Get } from '@overnightjs/core';
import { google } from 'googleapis';
const privateKey = require('../../google-svc-account-privatekey.json');

@Controller('api/calendar')
class CalendarController {

    private static mapEvent(evt: any, loggedUser: string) {
        const attendees = (evt.attendees ? evt.attendees
            .filter((att: any) => att.responseStatus === 'accepted')
            .map((att: any) => att.email) : null);

        return {
            id: evt.id,
            summary: evt.summary,
            description: evt.description,
            start: evt.start.dateTime.toLocaleString(),
            end: evt.end.dateTime,
            // Send only attendees whom have accepted the invite
            attendees: attendees,
            confirmedAttendees: attendees ? attendees.length : 0,
            loggedUserIsAttending: attendees ? attendees.includes(loggedUser) : false
        };
    }

    @Get('public-events')
    async getEvents(req: any, res: any): Promise<any> {
        // USER_ID is used to verify if he/she has accepted the invites for the
        // different events in the calendar
        const LOGGED_USER_ID = req.query.user;
        // configure a JWT auth client
        const jwtClient = new google.auth.JWT(
            privateKey.client_email,
            undefined,
            privateKey.private_key,
            ['https://www.googleapis.com/auth/calendar.events.readonly']
        );

        const calendar = google.calendar('v3');
        
        calendar.events.list({
            auth: jwtClient,
            calendarId: process.env.CALENDAR_ID,
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        })
            .then(function (results: any) {
                const events = new Array<any>();
                
                if (results.data.items && results.data.items.length > 0) {
                    results.data.items.forEach((evt: any) => {
                        events.push(CalendarController.mapEvent(evt, LOGGED_USER_ID));
                    });
                }
                res.status(200).json(events);
            })
            .catch(function (err: any) {
                res.status(400).json({ error: err });
            });
    }
}
export default CalendarController;