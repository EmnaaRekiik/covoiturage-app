namespace Covoiturage.Entities;

public enum DriverRequestStatus
{
    Pending = 0,
    Approved = 1,
    Rejected = 2
}

public enum ReservationStatus
{
    Pending = 0,
    Accepted = 1,
    Refused = 2,
    Cancelled = 3,
    Completed = 4
}

public enum TrajetStatus
{
    Published = 0,
    Full = 1,
    Cancelled = 2,
    Completed = 3
}

public enum ReportStatus
{
    Pending = 0,
    Reviewed = 1,
    Dismissed = 2
}