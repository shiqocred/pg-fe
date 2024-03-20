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
      "PUTRA3",
      "PUTRA4",
      "PUTRA5",
      "PUTRA6",
      "PUTRA7",
      "PUTRI1",
      "PUTRI3",
      "PUTRI4",
      "PUTRI7",
    ];

    const profileData = [
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
      { username: genUser(), password: await hashes() },
    ];

    // Data branch
    const branchData = [
      { cabang: role[0], profile: profileData[0] },
      { cabang: role[1], profile: profileData[1] },
      { cabang: role[2], profile: profileData[2] },
      { cabang: role[3], profile: profileData[3] },
      { cabang: role[4], profile: profileData[4] },
      { cabang: role[5], profile: profileData[5] },
      { cabang: role[6], profile: profileData[6] },
      { cabang: role[7], profile: profileData[7] },
      { cabang: role[8], profile: profileData[8] },
      { cabang: role[9], profile: profileData[9] },
      { cabang: role[10], profile: profileData[10] },
    ];

    // Simpan data ke database
    await Promise.all(
      branchData.map(async (branch) => {
        const { cabang, profile } = branch;
        const createdProfile = await database.profile.create({ data: profile });
        await database.branch.create({
          data: {
            cabang,
            profileId: createdProfile.id,
          },
        });
      })
    );
    console.log("Seeding the database categories success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
