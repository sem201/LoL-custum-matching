import { useState } from "react";
import UserContainer from "../components/Mobile/chooseUser/UserContainer";
import AddUserModal from "./mainPageModal/AddUserModal";
import SelectModeModal from "./mainPageModal/SelectModeModal";
import DraftModal from "../components/Mobile/chooseUser/DraftModal";
import HowToUseModal from "./mainPageModal/HowToUseModal";
import RedTeam from "../components/Mobile/Main/RedTeam";
import BlueTeam from "../components/Mobile/Main/BlueTeam";

import { User } from "../commonTypes";

const MobileMainpage = () => {
  const [allUsers, setAllUsers] = useState<User[]>([
    { id: 1, nickname: "User1", winRate: 50.4 },
    { id: 2, nickname: "User2", winRate: 52.1 },
    { id: 3, nickname: "User3", winRate: 49.5 },
    { id: 4, nickname: "User4", winRate: 48.9 },
    { id: 5, nickname: "User5", winRate: 53.3 },
    { id: 6, nickname: "User6", winRate: 51.2 },
    { id: 7, nickname: "User7", winRate: 47.8 },
    { id: 8, nickname: "User8", winRate: 50.0 },
    { id: 9, nickname: "User9", winRate: 49.1 },
    { id: 10, nickname: "User10", winRate: 52.7 },
  ]); // 전체 사용자 목록
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [modalType, setModalType] = useState<string | null>(null); // 현재 열리는 모달 타입
  const [redTeam, setRedTeam] = useState<User[]>([]); // RedTeam 유저 목록
  const [blueTeam, setBlueTeam] = useState<User[]>([]); // BlueTeam 유저 목록
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false); // DraftModal 상태 관리

  const addUser = (user: User) => {
    if (redTeam.length < 5) {
      setRedTeam((prev) => [...prev, user]);
    } else if (blueTeam.length < 5) {
      setBlueTeam((prev) => [...prev, user]);
    } else {
      alert("모든 팀이 이미 꽉 찼습니다!");
    }
    setAddedUsers((prev) => [...prev, user]);
  };

  const removeUser = (user: User) => {
    if (redTeam.some((u) => u.id === user.id)) {
      setRedTeam((prev) => prev.filter((u) => u.id !== user.id));
    } else if (blueTeam.some((u) => u.id === user.id)) {
      setBlueTeam((prev) => prev.filter((u) => u.id !== user.id));
    }
    setAddedUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  // 모달 열기
  const openModal = (type: string) => {
    setModalType(type);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="flex flex-col items-center justify-start w-[100vw] overflow-y-scroll">
      <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full mb-6 mt-5">
        <button
          className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("addUser")}
        >
          인원추가
        </button>
        <button
          className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("selectMode")}
        >
          모드선택
        </button>
        <button
          className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("howToUse")}
        >
          사용법
        </button>
      </div>
      <RedTeam teamMembers={redTeam} onRemoveUser={removeUser} />
      <BlueTeam teamMembers={blueTeam} onRemoveUser={removeUser} />

      <button className="font-blackHanSans w-[40vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
        팀짜기
      </button>

      {/* 모달들 */}
      {modalType === "addUser" && (
        <AddUserModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
        />
      )}
      {modalType === "selectMode" && (
        <SelectModeModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
          setIsDraftModalOpen={setIsDraftModalOpen} // DraftModal 상태 관리 prop 추가
        />
      )}
      {modalType === "howToUse" && (
        <HowToUseModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
        />
      )}

      {/* DraftModal 열기 */}
      {isDraftModalOpen && (
        <DraftModal closeModal={() => setIsDraftModalOpen(false)} />
      )}

      <UserContainer
        users={allUsers.filter(
          (user) => !addedUsers.some((u) => u.id === user.id)
        )}
        onAddUser={addUser}
      />
    </div>
  );
};

export default MobileMainpage;
