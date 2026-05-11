# Auth Testing Playbook (Emergent Google OAuth)

## Allowlist
Allowed Google accounts for `/admin/leads`:
- viknaroffvin@gmail.com

## Step 1 — Create test session in MongoDB
```bash
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  user_id: userId,
  email: 'viknaroffvin@gmail.com',
  name: 'Test Admin',
  picture: '',
  created_at: new Date()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
});
print('Session token: ' + sessionToken);
"
```

## Step 2 — Backend curl tests
```bash
SESSION_TOKEN=<from step 1>
API=http://localhost:8001

# Verify auth
curl -s -X GET "$API/api/auth/me" -H "Authorization: Bearer $SESSION_TOKEN"

# Protected: list leads
curl -s -X GET "$API/api/admin/leads" -H "Authorization: Bearer $SESSION_TOKEN"

# Protected: change status
curl -s -X PATCH "$API/api/admin/leads/<lead_id>/status?status=contacted" \
  -H "Authorization: Bearer $SESSION_TOKEN"

# Export CSV
curl -s -X GET "$API/api/admin/leads/export.csv" -H "Authorization: Bearer $SESSION_TOKEN"

# Public lead creation (no auth) — should also trigger Resend email
curl -s -X POST "$API/api/leads" -H "Content-Type: application/json" \
  -d '{"name":"Іван","phone":"+380501234567","city":"Вінниця","service":"Вікна","message":"Тест"}'
```

## Step 3 — Browser test
Set cookie before loading `/admin/leads`:
```python
await page.context.add_cookies([{
  "name": "session_token", "value": "<token>",
  "domain": "localhost", "path": "/", "sameSite": "Lax"
}])
await page.goto("http://localhost:3000/admin/leads")
```

## Cleanup
```bash
mongosh --eval "
use('test_database');
db.users.deleteMany({email: /test|admin/});
db.user_sessions.deleteMany({session_token: /test_session/});
"
```

## Checklist
- [ ] /api/auth/me returns user for valid token
- [ ] /api/auth/me returns 401 for missing/expired token
- [ ] /api/admin/leads returns 403 for non-allowlisted email
- [ ] /api/admin/leads returns paginated leads for allowlisted user
- [ ] Status patch persists in MongoDB
- [ ] CSV export returns proper CSV (Content-Type: text/csv)
- [ ] Search by phone/status/date works
- [ ] New lead triggers Resend email
- [ ] Frontend `/admin/leads` loads after OAuth callback
- [ ] Logout clears cookie and redirects to login
