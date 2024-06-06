const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const database = new PrismaClient();

async function main() {
  try {
    const genUser = () => {
      return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    };
    const hashes = async () => {
      const hashPassword = await bcrypt.hash("password", 10);
      return hashPassword;
    };
    const role = [
      "ALL",
      "PUTRA1",
      "PUTRA2",
      "PUTRA3",
      "PUTRA4",
      "PUTRA5",
      "PUTRA6",
      "PUTRA7",
      "PUTRI1",
      "PUTRI2",
      "PUTRI3",
      "PUTRI4",
      "PUTRI7",
    ];

    const profileData = [
      { username: genUser(), password: await hashes(), cabang: role[0] },
      { username: genUser(), password: await hashes(), cabang: role[1] },
      { username: genUser(), password: await hashes(), cabang: role[2] },
      { username: genUser(), password: await hashes(), cabang: role[3] },
      { username: genUser(), password: await hashes(), cabang: role[4] },
      { username: genUser(), password: await hashes(), cabang: role[5] },
      { username: genUser(), password: await hashes(), cabang: role[6] },
      { username: genUser(), password: await hashes(), cabang: role[7] },
      { username: genUser(), password: await hashes(), cabang: role[8] },
      { username: genUser(), password: await hashes(), cabang: role[9] },
      { username: genUser(), password: await hashes(), cabang: role[10] },
      { username: genUser(), password: await hashes(), cabang: role[11] },
      { username: genUser(), password: await hashes(), cabang: role[12] },
    ];

    // Simpan data ke database
    await database.profile.createMany({ data: profileData });

    console.log("Seeding the database categories success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
