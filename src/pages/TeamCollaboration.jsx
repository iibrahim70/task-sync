import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";

const TeamCollaboration = () => {
  const { user } = useContext(AuthContext);

  const [teams, setTeams] = useState(
    JSON.parse(localStorage.getItem("teams")) || []
  );

  const { register, reset, handleSubmit } = useForm();

  const handleCreateTeam = (data) => {
    console.log(data);
    const newTeam = {
      id: Date.now(),
      name: data.teamName,
      members: [user?.displayName],
    };

    setTeams([...teams, newTeam]);
    localStorage.setItem("teams", JSON.stringify([...teams, newTeam]));

    reset();
  };

  const handleJoinTeam = (data) => {
    const teamId = data.teamId;
    const team = teams.find((t) => t.id === teamId);

    if (team) {
      team.members.push(user?.displayName);

      setTeams([...teams]);
      localStorage.setItem("teams", JSON.stringify(teams));
    }

    reset();
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full text-black">
      <h2 className="text-center text-2xl font-bold mb-10">
        Team Collaboration
      </h2>

      <div>
        <section>
          <form onSubmit={handleSubmit(handleCreateTeam)}>
            <h3 className="block mb-1 font-medium">Create a Team</h3>
            <input
              type="text"
              className="inputFields mb-2"
              placeholder="Team Name"
              {...register("teamName")}
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-2 py-1 rounded w-full"
            >
              Create
            </button>
          </form>
        </section>

        <section className="mt-5">
          <form onSubmit={handleSubmit(handleJoinTeam)}>
            <h3 className="block mb-1 font-medium">Join a Team</h3>
            <input
              type="text"
              className="inputFields mb-2"
              placeholder="Team ID"
              {...register("teamId")}
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-2 py-1 rounded w-full"
            >
              Join
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default TeamCollaboration;
