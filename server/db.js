import { createPool } from "mysql2/promise";

export const pool = createPool({
    host:'roundhouse.proxy.rlwy.net',
    port:'28704',
    user:'root',
    database:'railway',
    password:'JrsFSTQHaCyDuQXFEODZxNfnoPXqYaQV'

}
)