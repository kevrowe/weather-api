# Weather API - Coding Challenge

## Your Task

Implement the following API endpoints in `src/routes/weather.ts`:

### 1. Get weather data for a specific date
**Endpoint:** `GET /weather/by-date/:date`

**Example:** `/weather/by-date/2025-10-10`

**Requirements:**
- Accept date in YYYY-MM-DD format
- Return all weather records for that date
- Include condition information (name, description) with each record
- Return 400 if date format is invalid
- Return 404 if no data exists for that date

### 2. Get five-day forecast
**Endpoint:** `GET /weather/forecast`

**Requirements:**
- Return weather data at 12:00 (noon) for each of the next 5 days
- Include condition information with each record
- Sort results by date ascending

## Response Format

All responses should follow this structure:

```typescript
{
  "error": string | null,
  "data": T | null
}
```

On success, `error` is `null` and `data` contains the result. On error, `data` is `null` and `error` contains the error message.

## Extension Task

Add support for temperature unit conversion via query parameter:

**Query parameter:** `tempUnit` - accepts `F` (Fahrenheit), `C` (Celsius), or `K` (Kelvin)

**Example:** `/weather/by-date/2025-10-10?tempUnit=F`

**Requirements:**
- Default to Kelvin if parameter not provided
- Convert `temp_min`, `temp_max`, and `feels_like` fields
- Return 400 if invalid unit specified

**Conversion formulas:**
- Kelvin to Celsius: `C = K - 273.15`
- Kelvin to Fahrenheit: `F = (K - 273.15) × 9/5 + 32`

## Tips

- The existing endpoint `GET /weather/` shows an example of the response structure
- TypeScript types for the database schema are in `src/db/types.ts`
- The `query` helper function from `src/lib/db.ts` can be used for database queries
- Use JOIN queries to include condition information
- Temperature values in the database are stored in Kelvin
- Unix timestamps can be converted to dates for filtering
